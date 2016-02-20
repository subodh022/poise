class OperatorsController < ApplicationController

	def index
		@records = Operator.includes(:skills => :operation).to_json(:include => { :skills => { :methods => :operation_title }})
		@lines = Line.includes(:enabled_sections).to_json(:include => :enabled_sections)
		@sections = Section.all
	end

	def create
		@operator = Operator.new(operator_params)

		if @operator.save
			@operator.create_skills
			render json: Operator.includes(:skills => :operation).find(@operator.id).to_json(:include => { :skills => { :methods => :operation_title }})
		else
			render json: @operator.errors, status: :unprocessable_entity
		end
	end

	def update
		@operator = Operator.find(params[:id])
		if @operator.update(operator_params)
		  @operator.update_skills
		  render json: Operator.includes(:skills => :operation).find(@operator.id).to_json(:include => { :skills => { :methods => :operation_title }})
		else
		  render json: @operator.errors, status: :unprocessable_entity
		end
	end

	def destroy
		@operator = Operator.find(params[:id])
		@operator.delete_skills
		@operator.destroy
		head :no_content
	end

	def update_skill
		result = []
		skills = params[:skills]
		ActiveRecord::Base.transaction do
			skills.each do |skill|
				result << Skill.find(skill[1]['id'])
				result.last.update_attributes!(value: skill[1]['value'].to_i)
			end
		end
		render json: Operator.includes(:skills => :operation).find(result.first.operator_id).to_json(:include => { :skills => { :methods => :operation_title }})
	end

	private

    def operator_params
    	params.require(:operator).permit(:emp_name, :emp_id, :line_id, :section_id)
    end
end
