json.array!(@report_data) do |data|
	json.key "Total Output"
	json.values data do |ws|
		json.label ws.section_name
		json.value ws.tot_output
	end
end
json.array!(@report_data) do |data|
	json.key "Hourly Average Output"
	json.values data do |ws|
		json.label ws.section_name
		json.value ws.avg_output
	end
end