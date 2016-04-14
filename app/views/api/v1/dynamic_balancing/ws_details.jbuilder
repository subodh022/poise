json.operators do
  if @operators == "NA"
  	json.array! []
  else
  	json.array! @operators
  end
end

json.outputs do
  json.array! [{average: (@outputs.blank? ? 0.0 : (@outputs.inject(:+).to_f / @outputs.size).round(2)), max: @outputs.max.to_i, min: @outputs.min.to_i}]
end

json.options do
	json.array! @avl_devaitions do |ad|
		outputs = ad.recent_outputs.map(&:output)
		json.ws_id ad.id
		json.direction ad.direction
		json.operation ad.operation_name
		json.operator ad.operator_with_skills(ad.operation_id)
		json.output [{average: (outputs.blank? ? 0.0 : (outputs.inject(:+).to_f / outputs.size).round(2)), max: outputs.max.to_i, min: outputs.min.to_i}]
	end
end