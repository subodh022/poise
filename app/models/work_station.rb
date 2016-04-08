class WorkStation < ActiveRecord::Base

	belongs_to :operation_bulletin
	belongs_to :operation
	belongs_to :machine
	belongs_to :section
	has_many :attendances
	has_many :machine_downtimes
	has_many :op_reworks
	has_many :hourly_outputs, -> { order("created_at DESC") } do
		def recent(n=3)
			limit(n)
		end
	end
	has_many :workstation_operators
	has_many :operators, :through => :workstation_operators

	has_one :attendance_today, -> { where(logged_at: Date.today.to_datetime) }, :class_name => "Attendance"
	

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
		operators.blank? ? "NA" : operators.map{|op| op['emp_name'] + " (#{op['emp_id']})"}.join(', ')
	end

	def recent_outputs
		hourly_outputs.select("id, work_station_id, output, logged_at, remarks").recent
	end
end
