class Api::V1::LinesController < ApiController

	def index
	  @lines = Line.all

	  respond_to do |format|
	   format.json{ @lines.to_json }
	   format.xml{}
	  end
	end

end
