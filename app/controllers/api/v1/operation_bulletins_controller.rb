class Api::V1::OperationBulletinsController < ApiController

	def index
	  @obs = OperationBulletin.where("line_id = ?", params[:line_id])

	  respond_to do |format|
	   format.json{ @obs.to_json }
	   format.xml{}
	  end
	end

end
