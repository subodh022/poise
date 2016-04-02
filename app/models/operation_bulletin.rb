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

	def rework_for_day(report_date)
		work_stations.joins(:op_reworks)
				.where("DATE(logged_at) = ?", report_date)
				.select("work_stations.*, sum(rework) as tot_rework")
				.group("work_stations.id")
				.includes(:operation)
	end

	def output_for_day(report_date)
		work_stations.joins(:hourly_outputs)
				.where("DATE(logged_at) = ?", report_date)
				.select("work_stations.*, sum(output) as tot_output")
				.group("work_stations.id")
				.includes(:operation)
	end
end
