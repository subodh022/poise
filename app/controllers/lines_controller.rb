class LinesController < ApplicationController

	def index
		@records = Line.includes(:sections).limit(4)
	end
end
