class WorkStationsController < ApplicationController

	def create
		@ws = WorkStation.new(ws_params)

		if @ws.save
			render json: @ws.to_json(:methods => [:operation, :machine, :operator_name, :operators])
		else
			render json: @ws.errors, status: :unprocessable_entity
		end
	end

	def update
		@ws = WorkStation.find(params[:id])
		operators = params[:work_station][:operator_ids] || []
		operators.map! {|op| op.to_i }
		if @ws.update(ws_params)
		  GenerateOperationBulletin.update_operators(@ws.id, operators)
		  render json: @ws.to_json(:methods => [:operation, :machine, :operator_name, :operators])
		else
		  render json: @ws.errors, status: :unprocessable_entity
		end
	end

	def destroy
		@ws = WorkStation.find(params[:id])
		@ws.destroy
		head :no_content
	end

	private

    def ws_params
    	params.require(:work_station).permit(:operation_bulletin_id, :section_id, :operation_id, :machine_id)
    end

end
