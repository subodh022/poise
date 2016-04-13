class Api::V1::LinesController < ApiController

	def index
	  @lines = Line.all
	end

end
