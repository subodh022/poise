class OperationsController < ApplicationController

	def index
		@records = Operation.all
		@sections = Section.group(:name)
	end

	def create
		@operation = Operation.new(operation_params)

		if @operation.save
			@operation.create_skills
			render json: @operation
		else
			render json: @operation.errors, status: :unprocessable_entity
		end
	end

	def update
		@record = Operation.find(params[:id])
		if @record.update(operation_params)
		  @record.update_skills
		  render json: @record
		else
		  render json: @record.errors, status: :unprocessable_entity
		end
	end

	def destroy
		@record = Operation.find(params[:id])
		@record.delete_skills
		@record.destroy
		head :no_content
	end

	private

    def operation_params
    	params.require(:operation).permit(:title, :smv, :section_name)
    end
end
