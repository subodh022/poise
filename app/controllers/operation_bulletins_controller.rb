class OperationBulletinsController < ApplicationController

	before_action :authenticate_user!, except: [:get_work_stations, :get_ob_list]

	def index
		@records = OperationBulletin.all
		@lines = Line.all
	end

	def create
		@ob = OperationBulletin.new(ob_params)

		if @ob.save
			render json: @ob
		else
			render json: @ob.errors, status: :unprocessable_entity
		end
	end

	def update
		@record = OperationBulletin.find(params[:id])
		if @record.update(ob_params)
		  render json: @record
		else
		  render json: @record.errors, status: :unprocessable_entity
		end
	end

	def destroy
		@record = OperationBulletin.find(params[:id])
		@record.destroy
		head :no_content
	end

	def manage
		record = OperationBulletin.find(params[:id])
		@ob = record.to_json(:methods => :line_name)
		@sections = record.line.enabled_sections
			.collect {|r| r.attributes.merge(
				{
					:workstations => WorkStation.stations(record.id, r.id), 
					:operations => r.get_operations
				}
			)}
			.to_json(:methods => [:operation, :machine, :operator_name, :operators])
		@machines = record.line.machines
	end

	def generate
		record = OperationBulletin.find(params[:id])
		@ob = record.to_json(:methods => [:line_name, :line_capacity])
		ob_sections = JSON.parse(record.line.enabled_sections
			.collect {|r| r.attributes.merge(
				{
					:workstations => WorkStation.stations(record.id, r.id), 
					:operations => r.get_operations, 
					:operators => JSON.parse(Operator.includes(:skills).where('section_id = ?', r.id).to_json(:methods => :skills))
				}
			)}
			.to_json(:methods => [:operation, :machine]))
		@sections = GenerateOperationBulletin.generate(ob_sections, record.takt_time)
		@machines = record.line.machines
	end

	def get_ob_list
		results = OperationBulletin.select(:id, :line_id, :style).where("line_id = ?", params[:line_id])
		render json: results
	end

	def get_work_stations
		results = WorkStation.joins(:section, :operation, :machine)
							 .select("work_stations.id as ws_id, sections.name as section_name, operations.title as operation_name, machines.name as machine_name")
							 .where("operation_bulletin_id = ?", params[:id])
							 .order("section_name")
		render json: results
	end

	private

    def ob_params
    	params.require(:operation_bulletin).permit(:style, :takt_time, :line_id)
    end

end
