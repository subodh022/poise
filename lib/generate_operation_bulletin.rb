module GenerateOperationBulletin

	def self.generate(ob_sections, takt_time)
		ob_sections.each do |section|
			ws_list = section['workstations'].sort_by {|k| [k['operation']['smv']*(-1), k['operation']['dhu']*(-1)] }
			operators = section['operators']

			ws_list.each do |ws|
				ws['operators'] = []
				op_count = operator_count(ws['operation']['smv'], takt_time)
				op_count.times do
				 	operator = assign_operators(ws['operation']['id'], operators)
				 	ws['operators'] << {'operator_skill': operator['skill_value'], 'operator_name': operator['emp_name'] + " (#{operator['emp_id']})"} if operator
				 	operators.delete_if {|op| op['id'] == operator['id'] } if operator
				end
			end
			section['workstations'] = ws_list.sort_by {|k| k['id']}
		end
		ob_sections
	end

	def self.assign_operators(operation_id, operators)
		operator = nil
		filtered_operators = []
		operators.each do |op|
			op['skills'].each do |skill|
				filtered_operators << {
					operator: op, 
					skill_count: op['skills'].select {|c| c['value'] > 0}.count, 
					skill_value: skill['value']
				} if skill['operation_id'] == operation_id and skill['value'] > 0
			end
		end

		# Sort filtered operators by skill value
		filtered_operators.sort_by! { |op| op[:skill_value]*(-1) }

		specialized_operator = filtered_operators.select {|op| op[:skill_count] == 1 }.first
		if !specialized_operator.blank?
			# If an operator has skills on this operation, pick that operator
			operator = specialized_operator[:operator]
			operator['skill_value'] = specialized_operator[:skill_value]
		elsif !filtered_operators.blank?
			# If there are multiple oeprators, pick with highesh skill value
			operator = filtered_operators.first[:operator]
			operator['skill_value'] = filtered_operators.first[:skill_value]				
		end

		operator
	end

	def self.operator_count(smv, takt_time)
		count = 0
		if smv < takt_time
			count = 1
		else
			if (smv - takt_time) < 0.7
				count = 1
			elsif (smv - takt_time) >= 0.7 and (smv - takt_time) < 1.4
				count = 2
			else
				count = 3
			end
		end
		count
	end

end