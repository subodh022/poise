class OperationsController < ApplicationController

	def index
		@records = Operation.all
	end

	def create
		@operation = Operation.new(operation_params)

		if @operation.save
			render json: @operation
		else
			render json: @operation.errors, status: :unprocessable_entity
		end
	end

	def update
		@record = Operation.find(params[:id])
		if @record.update(operation_params)
		  render json: @record
		else
		  render json: @record.errors, status: :unprocessable_entity
		end
	end

	def destroy
		@record = Operation.find(params[:id])
		@record.destroy
		head :no_content
	end

	private

    def operation_params
    	params.require(:operation).permit(:title, :smv)
    end
end
