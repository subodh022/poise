class OperationBulletin < ActiveRecord::Base

	belongs_to :line
	has_many :work_stations

	def line_name
		line.title
	end

	def line_capacity
		line.capacity
	end

	def downtime_for_day(report_date)
		work_stations.joins(:machine_downtimes)
				.where("DATE(logged_at) = ?", report_date)
				.select("work_stations.*, sum(downtime) as tot_downtime")
				.group("work_stations.id")
				.includes(:operation)
	end
end
