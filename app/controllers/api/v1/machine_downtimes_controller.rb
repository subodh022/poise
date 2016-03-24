class Api::V1::MachineDowntimesController < ApiController

	def index
	  @downtimes = MachineDowntime.where("work_station_id = ? AND DATE(logged_at) = ?", params[:work_station_id], params[:logged_at])

	  respond_to do |format|
	   format.json{ @downtimes.to_json }
	   format.xml{}
	  end
	end

	def create
		@md = MachineDowntime.new(machine_downtime_params)

		if @md.save
			render json: @md.to_json
		else
			render json: @md.errors, status: :unprocessable_entity
		end
	end

	private

	def machine_downtime_params
    	params.require(:machine_downtime).permit(:work_station_id, :downtime, :logged_at, :remarks)
    end

end
