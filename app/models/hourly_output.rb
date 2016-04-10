class HourlyOutput < ActiveRecord::Base

	belongs_to :work_station

	def formatted_logged_at
		logged_at.to_datetime().strftime("%d-%b-%Y %T")
	end
end
