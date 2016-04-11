collection @work_stations
attributes :id, :section_id, :operation_bulletin_style, :section_name, :operation_name, :machine_name, :operator_name
node(:attendance_today) {|ws| ws.attendance_for_today }
node(:status) {|ws| ws.status }