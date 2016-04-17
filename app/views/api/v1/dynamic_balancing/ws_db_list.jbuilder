json.array! @sections do |section|
	json.section_name section.name
	json.work_stations section.ob_work_stations(@ob.id) do |ws|
		status = ws.status
		json.ws_id ws.id
		json.section section.name
		json.machine ws.machine_name
		json.operation ws.operation_name
		json.op_class status[:state]
		json.mac_class status[:mac_state]
	end
end