class WorkStation < ActiveRecord::Base

	belongs_to :operation_bulletin
	belongs_to :operation
	belongs_to :machine
	belongs_to :operator
	belongs_to :section
	has_many :attendances
	has_many :machine_downtimes

	def self.stations(ob_id, section_id)
		where("operation_bulletin_id = ? and section_id = ?", ob_id, section_id)
	end

	def operation_bulletin_style
		operation_bulletin.style
	end

	def section_name
		section.name
	end

	def machine_name
		machine.name
	end

	def operation_name
		operation.title
	end

	def operator_name
		operator.blank? ? "NA" : operator.name
	end

	def attendance_today
		attendance = Attendance.where(work_station_id: id, logged_at: Date.today.to_datetime)
		attendance.blank? ? "false" : attendance.first.present
	end
end
