json.array!(@report_data) do |data|
	json.key "Total Downtime"
	json.values data do |ws|
		json.label ws.logged_at.strftime("%d/%m/%Y")
		json.value ws.tot_attendance
	end
end