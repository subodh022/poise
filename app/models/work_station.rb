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

	def operator_with_skills(operation_id)
		operators.blank? ? "NA" : operators.map{|op| op.name_with_skill(operation_id).merge({name_class: (attendance_for_today ? "green-item" : "red-item")}) }
	end

	def recent_outputs
		hourly_outputs.recent
	end

	def most_recent_output
		op = hourly_outputs.recent(1)
		op.blank? ? "NA" : op.first.output
	end

	def avl_deviations
		ws_list = WorkStation.includes(:operators => :skills).select("work_stations.*, 'Up' as direction").where("operation_bulletin_id = ? and section_id = ? and id < ?", operation_bulletin_id, section_id, id).order('id desc').limit(3) | WorkStation.includes(:operators => :skills).select("work_stations.*, 'Down' as direction").where("operation_bulletin_id = ? and section_id = ? and id > ?", operation_bulletin_id, section_id, id).order('id').limit(3)
		ws_list.reject! {|ws| ws.has_deviation? }
		ws_list
	end

	def attendance_for_today
		attendance_today.blank? ? false : attendance_today.present
	end

	def has_deviation?
		has_deviation = OperatorDeviation.where("old_ws_id = ? and created_at >= ?", id, (Time.now - 1.hour)).order("created_at").last
		given_deviation = OperatorDeviation.where("new_ws_id = ? and created_at >= ?", id, (Time.now - 1.hour)).order("created_at").last
		( !has_deviation.blank? or !given_deviation.blank? )
	end

	def status
		status = {state: "green", message: []}
		
		unless attendance_for_today
			status[:state] = "red"
			status[:message] << "Operator not present"
		else
			status[:state] = "green"
			status[:message] << "Operator present"
		end

		output = most_recent_output
		if output == "NA" or output < 50
			status[:state] = "red"
			status[:message] << "Output below par"
		elsif output >=50 and output < 60
			status[:state] = "orange" if status[:state] != "red"
			status[:message] << "Output in critical zone"
		else
			status[:state] = "green" if status[:state] != "red"
			status[:message] << "Output normal"
		end

		has_deviation = OperatorDeviation.where("old_ws_id = ? and created_at >= ?", id, (Time.now - 1.hour)).order("created_at").last
		unless has_deviation.blank?
			status[:state] = "yellow"
			status[:message] << "Has an operator from '#{has_deviation.from_ws.operation_name}' workstation helping"
		end

		given_deviation = OperatorDeviation.where("new_ws_id = ? and created_at >= ?", id, (Time.now - 1.hour)).order("created_at").last
		unless given_deviation.blank?
			status[:state] = "yellow"
			status[:message] << "Operator helping workstation with '#{given_deviation.to_ws.operation_name}' operation"
		end

		status[:message] = status[:message].join(", ")
		status
	end
end
