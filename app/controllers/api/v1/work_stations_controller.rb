class Api::V1::WorkStationsController < ApiController

	def index
	  @work_stations = WorkStation.includes(:operation_bulletin, :section, :operation, :machine, :operator)

	  respond_to do |format|
	   format.json{ @work_stations.to_json }
	   format.xml{}
	  end
	end

	def create
		@ws = WorkStation.new(ws_params)

		if @ws.save
			render json: @ws.to_json(:methods => [:operation, :machine])
		else
			render json: @ws.errors, status: :unprocessable_entity
		end
	end

	def update
		@ws = WorkStation.find(params[:id])
		if @ws.update(ws_params)
		  render json: @ws.to_json(:methods => [:operation, :machine])
		else
		  render json: @ws.errors, status: :unprocessable_entity
		end
	end

	def destroy
		@ws = WorkStation.find(params[:id])
		@ws.destroy
		head :no_content
	end

	private

    def ws_params
    	params.require(:work_station).permit(:operation_bulletin_id, :section_id, :operation_id, :machine_id)
    end

end
