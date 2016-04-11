json.operators do
  json.array! @operators, :id, :emp_name, :emp_id
end

json.outputs do
  json.array! @outputs, :output, :formatted_logged_at, :remarks
end

json.options do
	json.array! @avl_devaitions do |ad|
		json.ws_id ad.id
		json.direction ad.direction
		json.operation ad.operation_name
		json.operator ad.operator_with_skills(ad.operation_id)
		json.output ad.recent_outputs do |op|
			json.value op.output
		end
	end
end