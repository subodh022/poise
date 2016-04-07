class Api::V1::DynamicBalancingController < ApiController

	def ws_list
		@work_stations = WorkStation.includes(:operation_bulletin, :section, :operation, :machine, :operators)
							.includes(:last_three_outputs, :attendances)
	  						.where("operation_bulletin_id = ?", params[:operation_bulletin_id])
	  						.order("id")
	end

end