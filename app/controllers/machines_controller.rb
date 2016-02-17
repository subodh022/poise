class MachinesController < ApplicationController

	def index
		@records = Machine.all
		@lines = Line.all
	end

	def create
		@machine = Machine.new(machine_params)

		if @machine.save
			render json: @machine
		else
			render json: @machine.errors, status: :unprocessable_entity
		end
	end

	def update
		@machine = Machine.find(params[:id])
		if @machine.update(machine_params)
		  render json: @machine
		else
		  render json: @machine.errors, status: :unprocessable_entity
		end
	end

	def destroy
		@machine = Machine.find(params[:id])
		@machine.destroy
		head :no_content
	end

	private

    def machine_params
    	params.require(:machine).permit(:name, :mac_id, :attachment, :line_id, :tot_units)
    end

end
