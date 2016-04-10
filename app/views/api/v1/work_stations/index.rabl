collection @work_stations
attributes :id, :section_id, :operation_bulletin_style, :section_name, :operation_name, :machine_name, :operator_name
node(:attendance_today) {|ws| ws.attendance_today.blank? ? "false" : ws.attendance_today.present }