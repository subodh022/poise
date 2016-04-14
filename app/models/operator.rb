class Operator < ActiveRecord::Base

	belongs_to :line
	belongs_to :section
	has_many :skills

	belongs_to :workstation_operator

	def create_skills
		ActiveRecord::Base.transaction do
			Operation.where("section_name = ?", section_name).each do |op|
				skills.create(operation: op, value: 0)
			end
		end
	end

	def update_skills
		# TODO
	end

	def delete_skills
		ActiveRecord::Base.transaction do
			Skill.where("operator_id = ?", id).each do |skill|
				skill.destroy
			end
		end
	end

	def section_name
		section.name
	end

	def name_with_skill(operation_id)
		skill = operation_skill(operation_id)
		# "<div>"+emp_name + " ( ID: #{emp_id}," + " Skill: " + operation_skill(operation_id) +" )</div>"
		{id: id, emp_id: emp_id, name: emp_name, skill: "#{skill*10}%", skill_class: (skill < 5 ? "red-item" : "green-item")}
	end

	def operation_skill(operation_id)
		skill = skills.where(operation_id: operation_id).first
		skill.blank? ? 0 : skill.value
	end
end
