json.array!(@report_data) do |data|
	json.key "Total Downtime"
	json.values data do |ws|
		json.label ws.operation_name
		json.value ws.tot_downtime
	end
end
json.array!(@report_data) do |data|
	json.key "Average Downtime"
	json.values data do |ws|
		json.label ws.operation_name
		json.value ws.avg_downtime
	end
end