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
				.select("work_stations.*, sum(downtime) as tot_downtime, avg(downtime) as avg_downtime")
				.group("work_stations.id")
				.includes(:operation)
	end

	def rework_for_day(report_date)
		work_stations.joins(:op_reworks)
				.where("DATE(logged_at) = ?", report_date)
				.select("work_stations.*, sum(rework) as tot_rework, avg(rework) as avg_rework")
				.group("work_stations.id")
				.includes(:operation)
	end

	def output_for_day(report_date)
		work_stations.joins(:hourly_outputs)
				.where("DATE(logged_at) = ?", report_date)
				.select("work_stations.*, sum(output) as tot_output, avg(output) as avg_output")
				.group("work_stations.id")
				.includes(:operation)
	end

	def attendance_for_week(report_date)
		work_stations.joins(:attendances)
				.where("DATE(logged_at) >= ?", (report_date - 1.week) )
				.select("logged_at, sum(present) as tot_attendance")
				.group("logged_at")
	end
end
