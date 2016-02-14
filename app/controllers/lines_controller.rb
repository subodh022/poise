class LinesController < ApplicationController

	def index
		@records = Line.all
	end

	def update
		Line.find(params[:id]).update(line_params)
		render :text => "Success"
	end

	def get_sections
		@sections = Line.find(params[:id]).sections
		render json: @sections.to_json
	end

	private

	def line_params
	  params.require(:line).permit(:title, :capacity)
	end
end
