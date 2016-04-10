class Api::V1::MachineDowntimesController < ApiController

	def index
	  @downtimes = MachineDowntime.where("work_station_id = ? AND DATE(logged_at) = ?", params[:work_station_id], params[:logged_at])

	  respond_to do |format|
	   format.json{ @downtimes.to_json }
	   format.xml{}
	  end
	end

	def create
		result = MachineDowntime.where(work_station_id: params[:work_station_id], logged_at: params[:logged_at])
		if result.blank?
			@md = MachineDowntime.new(machine_downtime_params)
			if @md.save
				render json: @md.to_json
				return
			end
		else
			@md = result.first
			if @md.update(machine_downtime_params)
				render json: @md.to_json
				return
			end
		end

		render json: @md.errors, status: :unprocessable_entity
	end

	private

	def machine_downtime_params
    	params.require(:machine_downtime).permit(:work_station_id, :downtime, :logged_at, :remarks)
    end

end
