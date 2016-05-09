class WorkStationsController < ApplicationController

	def create
		@ws = WorkStation.new(ws_params)

		if @ws.save
			Machine.update_unit_count("add", @ws.machine_id)
			render json: @ws.to_json(:methods => [:operation, :machine, :operator_name, :operators])
		else
			render json: @ws.errors, status: :unprocessable_entity
		end
	end

	def update
		@ws = WorkStation.find(params[:id])
		old_mac_id = @ws.machine_id
		new_mac_id = params[:machine_id]
		operators = params[:work_station][:operator_ids] || []
		operators.map! {|op| op.to_i }
		if @ws.update(ws_params)
		  Machine.update_unit_count("update", new_mac_id, old_mac_id)
		  GenerateOperationBulletin.update_operators(@ws.id, operators)
		  render json: @ws.to_json(:methods => [:operation, :machine, :operator_name, :operators])
		else
		  render json: @ws.errors, status: :unprocessable_entity
		end
	end

	def destroy
		@ws = WorkStation.find(params[:id])
		Machine.update_unit_count("delete", @ws.machine_id)
		@ws.destroy
		head :no_content
	end

	private

    def ws_params
    	params.require(:work_station).permit(:operation_bulletin_id, :section_id, :operation_id, :machine_id)
    end

end
