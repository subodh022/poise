class Api::V1::ReportsController < ApiController

	def working_hours
	  @work_hours = WORKING_HOURS.collect {|wh| OpenStruct.new({:id => wh}) }
	end

	def downtime
	  report_date = params[:report_date] || Date.today
	  ob = OperationBulletin.find(params[:ob_id])
	  @report_data = [ob.downtime_for_day(report_date)]
	end

end
