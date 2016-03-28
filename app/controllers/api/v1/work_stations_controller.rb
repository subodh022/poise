class Api::V1::WorkStationsController < ApiController

	def index
	  @work_stations = WorkStation.includes(:operation_bulletin, :section, :operation, :machine, :operator).where("operation_bulletin_id = ?", params[:operation_bulletin_id])

	  respond_to do |format|
	   format.json{ @work_stations.to_json }
	   format.xml{}
	  end
	end

end
