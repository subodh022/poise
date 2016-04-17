class Api::V1::DynamicBalancingController < ApiController

	def ws_list
		@work_stations = WorkStation.includes(:operation_bulletin, :section, :operation, :machine, :operators)
	  						.where("operation_bulletin_id = ?", params[:operation_bulletin_id])
	  						.order("section_id, id")
	end

	def ws_db_list
		@ob = OperationBulletin.find(params[:ob_id])
		@sections = @ob.line.enabled_sections
	end

	def ws_details
		@ws = WorkStation.find_by_id(params[:work_station_id])
		@operators = @ws.operator_with_skills(@ws.operation_id)
		@outputs = @ws.recent_outputs.map(&:output)
		@avl_devaitions = @ws.avl_deviations
	end

	def ws_mac_details
		@ws = WorkStation.find_by_id(params[:work_station_id])
		@machines = [@ws.machine]
	end

	def create_deviation
		@od = OperatorDeviation.new(old_ws_id: params[:old_ws_id], new_ws_id: params[:new_ws_id], dev_time: params[:hours].to_i*60, operator_id: params[:operator_id])
		if @od.save
			render json: @od.to_json
		else
			render json: @od.errors, status: :unprocessable_entity
		end
	end

	def create_mac_deviation
		@md = MachineDeviation.new(new_ws_id: params[:ws_id], dev_time: params[:hours].to_i*60, machine_id: params[:mac_id])
		if @md.save
			render json: @md.to_json
		else
			render json: @md.errors, status: :unprocessable_entity
		end
	end

end