class LinesController < ApplicationController

	def index
		@records = Line.includes(:sections).limit(4)
	end

	def get_sections
		@sections = Line.find(params[:id]).sections
		render json: @sections.to_json
	end
end
