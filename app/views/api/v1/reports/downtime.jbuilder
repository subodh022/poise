json.array!(@report_data) do |data|
	json.key "Downtime"
	json.values data do |ws|
		json.label ws.operation_name
		json.value ws.tot_downtime
	end
end