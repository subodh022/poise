class WorkStation < ActiveRecord::Base

	belongs_to :operation_bulletin
	belongs_to :operation
	belongs_to :machine
	belongs_to :section
	has_many :attendances
	has_many :machine_downtimes
	has_many :op_reworks
	has_many :hourly_outputs, -> { order("created_at DESC") } do
		def recent(n=8)
			limit(n)
		end
	end
	has_many :workstation_operators
	has_many :operators, :through => :workstation_operators
	has_one :attendance_today, -> { where(logged_at: Date.today.to_datetime) }, :class_name => "Attendance"
	

	def self.stations(ob_id, section_id)
		includes(:operators).where("operation_bulletin_id = ? and section_id = ?", ob_id, section_id)
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
		workstation_operators.blank? ? "NA" : workstation_operators.map{|op| op.operator.name_with_skill(operation_id)
			.merge({
				name_class: (Attendance.attendance_today(id, op.id).blank? ? "red-item" : (Attendance.attendance_today(id, op.id).last.present ? "green-item" : "red-item"))
			})
		}
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

	def attendances_for_today
		attendances_today = workstation_operators.map {|op| [op.id, Attendance.attendance_today(id, op.id).blank? ? "false" : Attendance.attendance_today(id, op.id).last.present] }
	end

	def has_deviation?
		has_deviation = OperatorDeviation.where("old_ws_id = ? and created_at >= ?", id, (Time.now - 1.hour)).order("created_at").last
		given_deviation = OperatorDeviation.where("new_ws_id = ? and created_at >= ?", id, (Time.now - 1.hour)).order("created_at").last
		( !has_deviation.blank? or !given_deviation.blank? )
	end

	def status
		status = {state: "green", mac_state: "green", message: [], mac_message: ["Machine operational"]}
		final_attendance = attendances_for_today.inject(true){|a,x| a and x[1] } && (attendance_today.blank? ? false : attendance_today.present)
		
		unless final_attendance
			status[:state] = "blue"
			status[:message] << "Operator(s) not present"
		else
			status[:state] = "green"
			status[:message] << "Operator(s) present"
		end

		output = most_recent_output
		if output == "NA" or output < 50
			status[:state] = "red" if status[:state] == "green"
			status[:message] << "Output below par"
		elsif output >=50 and output < 60
			status[:state] = "orange" if status[:state] == "green"
			status[:message] << "Output in critical zone"
		else
			status[:state] = "green" if status[:state] != "blue"
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

		downtimes = machine_downtimes.where("created_at + INTERVAL downtime MINUTE > ?", Time.now.utc)
		unless downtimes.blank?
			status[:mac_state] = "red"
			status[:mac_message] = "Machine Down"
		end

		mac_deviation = MachineDeviation.where("new_ws_id = ? and created_at + INTERVAL dev_time MINUTE > ?", id, Time.now.utc)
		unless mac_deviation.blank?
			status[:mac_state] = "yellow"
			status[:mac_message] = "New machine allocated"
		end


		status[:message] = status[:message].join(", ")
		status
	end
end
