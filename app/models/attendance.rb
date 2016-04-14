class Attendance < ActiveRecord::Base

	belongs_to :workstation_operator
	# belongs_to :operator, :through => :workstation_operator
	# belongs_to :work_station, :through => :workstation_operator

	##update attendances a join work_stations ws on a.work_station_id = ws.id join workstation_operators op on ws.id = op.work_station_id set workstation_operator_id = op.id;

	def self.attendance_today(ws_id, ws_op_id)
		where(work_station_id: ws_id, workstation_operator_id: ws_op_id, logged_at: Date.today.to_datetime)
	end

end
