class Api::V1::WorkStationsController < ApiController

	def index
	  	@work_stations = WorkStation.includes(:operation_bulletin, :section, :operation, :machine, :operators)
	  						.includes(:attendance_today)
	  						.where("operation_bulletin_id = ?", params[:operation_bulletin_id])
	  						.order("section_id, id")
	end

	def record_attendance
		attendance = Attendance.find_or_create_by(work_station_id: params[:work_station_id], workstation_operator_id: params[:workstation_operator_id], logged_at: params[:logged_at].to_datetime)
		attendance.update_attributes(present: params[:present])

		render json: {code: "201", message: "Success"}
	end

	def downtime
	  @downtime = MachineDowntime.where(work_station_id: params[:work_station_id], logged_at: params[:logged_at])
	end

	def rework
	  @rework = OpRework.where(work_station_id: params[:work_station_id], logged_at: params[:logged_at])
	end

	def output
	  @output = HourlyOutput.where(work_station_id: params[:work_station_id], logged_at: params[:logged_at])
	end

end