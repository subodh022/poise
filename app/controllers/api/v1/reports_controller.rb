class Api::V1::ReportsController < ApiController

	def working_hours
	  @work_hours = WORKING_HOURS.collect {|wh| OpenStruct.new({:id => wh}) }
	end

	def downtime
	  report_date = params[:report_date].to_date || Date.today
	  report_section = params[:report_section] || 0
	  ob = OperationBulletin.find(params[:ob_id])
	  @report_data = [ob.downtime_for_day(report_date, report_section)]
	end

	def rework
	  report_date = params[:report_date].to_date || Date.today
	  report_section = params[:report_section] || 0
	  ob = OperationBulletin.find(params[:ob_id])
	  @report_data = [ob.rework_for_day(report_date, report_section)]
	end

	def output
	  report_date = params[:report_date].to_date || Date.today
	  report_section = params[:report_section] || 0
	  ob = OperationBulletin.find(params[:ob_id])
	  @report_data = [ob.output_for_day(report_date, report_section)]
	end

	def section_output
	  report_date = params[:report_date].to_date || Date.today
	  ob = OperationBulletin.find(params[:ob_id])
	  @report_data = [ob.section_output_for_day(report_date)]
	end

	def attendance
	  report_date = Date.today
	  ob = OperationBulletin.find(params[:ob_id])
	  @report_data = [ob.attendance_for_month(report_date)]
	end

end
