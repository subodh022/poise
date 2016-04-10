json.operators do
  json.array! @operators, :id, :emp_name, :emp_id
end

json.outputs do
  json.array! @outputs, :output, :formatted_logged_at, :remarks
end

json.options do
	json.array! @avl_devaitions do |ad|
		json.operation ad.operation_name
		json.operator ad.operator_with_skills(ad.operation_id)
		json.output ad.most_recent_output
	end
end