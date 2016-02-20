class OperationBulletinsController < ApplicationController

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
			.collect {|r| r.attributes.merge({:workstations => WorkStation.stations(record.id, r.id), :operations => r.get_operations}) }
			.to_json(:methods => [:operation, :machine])
		@machines = record.line.machines
	end

	private

    def ob_params
    	params.require(:operation_bulletin).permit(:style, :line_id)
    end

end
