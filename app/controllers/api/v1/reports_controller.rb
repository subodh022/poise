class Api::V1::ReportsController < ApiController

	def working_hours
	  @work_hours = WORKING_HOURS.collect {|wh| OpenStruct.new({:id => wh}) }

	  respond_to do |format|
	   format.json{ @work_hours.to_json }
	   format.xml{}
	  end
	end

end
