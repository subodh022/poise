class Api::V1::DynamicBalancingController < ApiController

	def ws_list
		@work_stations = WorkStation.includes(:operation_bulletin, :section, :operation, :machine, :operators)
							.includes(:attendance_today)
	  						.where("operation_bulletin_id = ?", params[:operation_bulletin_id])
	  						.order("section_id, id")
	end

	def ws_details
		@ws = WorkStation.find_by_id(params[:work_station_id])
		@operators = @ws.operators
		@outputs = @ws.recent_outputs
		@avl_devaitions = @ws.avl_deviations
	end

end