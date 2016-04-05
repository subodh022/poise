json.array!(@report_data) do |data|
	json.key "Total Rework"
	json.values data do |ws|
		json.label ws.operation_name
		json.value ws.tot_rework
	end
end
json.array!(@report_data) do |data|
	json.key "Average Rework"
	json.values data do |ws|
		json.label ws.operation_name
		json.value ws.avg_rework
	end
end