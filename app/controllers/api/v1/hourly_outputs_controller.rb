class Api::V1::HourlyOutputsController < ApiController

	def index
	  @outputs = HourlyOutput.where("work_station_id = ? AND DATE(logged_at) = ?", params[:work_station_id], params[:logged_at])

	  respond_to do |format|
	   format.json{ @outputs.to_json }
	   format.xml{}
	  end
	end

	def create
		@ho = HourlyOutput.new(output_params)

		if @ho.save
			render json: @ho.to_json
		else
			render json: @ho.errors, status: :unprocessable_entity
		end
	end

	private

	def output_params
    	params.require(:hourly_output).permit(:work_station_id, :output, :logged_at, :remarks)
    end

end
