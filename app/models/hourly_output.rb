class HourlyOutput < ActiveRecord::Base

	belongs_to :work_station

	validates :output, presence: true

	def formatted_logged_at
		logged_at.to_datetime().strftime("%d-%b-%Y %T")
	end
end
