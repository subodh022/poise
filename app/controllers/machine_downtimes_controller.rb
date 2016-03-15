class MachineDowntimesController < ApiController

	def index
		@records = MachineDowntime.where("DATE(logged_at) = ?", Date.today)
		render json: @records
	end

	def create
		@machine_downtime = MachineDowntime.new(machine_downtime_params)

		if @machine_downtime.save
			render json: @machine_downtime
		else
			render json: @machine_downtime.errors, status: :unprocessable_entity
		end
	end

	def update
		@machine_downtime = MachineDowntime.find(params[:id])
		if @machine_downtime.update(machine_downtime_params)
		  render json: @machine_downtime
		else
		  render json: @machine_downtime.errors, status: :unprocessable_entity
		end
	end

	def destroy
		@machine_downtime = MachineDowntime.find(params[:id])
		@machine_downtime.destroy
		head :no_content
	end

	private

    def machine_downtime_params
    	params.require(:machine_downtime).permit(:work_station_id, :downtime, :logged_at, :remarks)
    end
end
