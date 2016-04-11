json.array! @work_stations do |ws|
	json.work_station do
		json.id ws.id
		json.section_id ws.section_id
		json.operation_bulletin_style ws.operation_bulletin_style
		json.section_name ws.section_name
		json.operation_name ws.operation_name
		json.machine_name ws.machine_name
		json.operator_name ws.operator_name
		json.attendance_today ws.attendance_for_today
		json.(ws.status, :state, :message)
	end
end
