class Api::V1::HourlyOutputsController < ApiController

	def index
	  @outputs = HourlyOutput.where("work_station_id = ? AND DATE(logged_at) = ?", params[:work_station_id], params[:logged_at])

	  respond_to do |format|
	   format.json{ @outputs.to_json }
	   format.xml{}
	  end
	end

	def create
		result = HourlyOutput.where(work_station_id: params[:work_station_id], logged_at: params[:logged_at])
		if result.blank?
			@output = HourlyOutput.new(output_params)
			if @output.save
				render json: @output.to_json
				return
			end
		else
			@output = result.first
			if @output.update(output_params)
				render json: @output.to_json
				return
			end
		end

		render json: @output.errors, status: :unprocessable_entity
	end

	private

	def output_params
    	params.require(:hourly_output).permit(:work_station_id, :output, :logged_at, :remarks)
    end

end
