json.array!(@report_data) do |data|
	json.key "Output"
	json.values data do |ws|
		json.label ws.operation_name
		json.value ws.tot_output
	end
end