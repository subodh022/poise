collection @work_stations
attributes :id, :operation_bulletin_style, :section_name, :operation_name, :machine_name, :operator_name
node(:attendance_today) {|ws| ws.attendance_today.blank? ? "false" : ws.attendance_today.present }
node(:bg_color) {|ws| ws.attendance_today.blank? ? "red-item" : (ws.attendance_today.present ? "green-item" : "red-item") }