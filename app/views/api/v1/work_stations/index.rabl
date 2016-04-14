collection @work_stations
attributes :id, :section_id, :operation_bulletin_style, :section_name, :operation_name, :machine_name, :operator_name
node(:operators_attendance) {|ws| ws.workstation_operators.map {|op| [op.id, Attendance.attendance_today(ws.id, op.id).blank? ? "false" : Attendance.attendance_today(ws.id, op.id).last.present] } }