class OperatorsController < ApplicationController

	def index
		@records = Operator.all
		@lines = Line.all
	end

	def create
		@operator = Operator.new(operator_params)

		if @operator.save
			render json: @operator
		else
			render json: @operator.errors, status: :unprocessable_entity
		end
	end

	def update
		@record = Operator.find(params[:id])
		if @record.update(operator_params)
		  render json: @record
		else
		  render json: @record.errors, status: :unprocessable_entity
		end
	end

	def destroy
		@record = Operator.find(params[:id])
		@record.destroy
		head :no_content
	end

	private

    def operator_params
    	params.require(:operator).permit(:emp_name, :emp_id, :line_id)
    end
end
