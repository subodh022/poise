class Api::V1::WorkStationsController < ApiController

	def index
	  @work_stations = WorkStation.includes(:operation_bulletin, :section, :operation, :machine, :operators).where("operation_bulletin_id = ?", params[:operation_bulletin_id])

	  respond_to do |format|
	   format.json{ @work_stations.to_json }
	   format.xml{}
	  end
	end

	def record_attendance
		attendance = Attendance.find_or_create_by(work_station_id: params[:work_station_id], logged_at: params[:logged_at].to_datetime)
		attendance.update_attributes(present: params[:present])

		render json: {code: "201", message: "Success"}
	end

end