class Api::V1::WorkStationsController < ApiController

	def index
	  @work_stations = WorkStation.includes(:operation_bulletin, :section, :operation, :machine, :operator)

	  respond_to do |format|
	   format.json{ @work_stations.to_json }
	   format.xml{}
	  end
	end

end
