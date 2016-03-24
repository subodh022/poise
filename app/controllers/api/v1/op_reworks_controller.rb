class Api::V1::OpReworksController < ApiController

	def index
	  @reworks = OpRework.where("work_station_id = ? AND DATE(logged_at) = ?", params[:work_station_id], params[:logged_at])

	  respond_to do |format|
	   format.json{ @reworks.to_json }
	   format.xml{}
	  end
	end

	def create
		@or = OpRework.new(rework_params)

		if @or.save
			render json: @or.to_json
		else
			render json: @or.errors, status: :unprocessable_entity
		end
	end

	private

	def rework_params
    	params.require(:op_rework).permit(:work_station_id, :rework, :logged_at, :remarks)
    end

end
