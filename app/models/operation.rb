class Operation < ActiveRecord::Base

	has_many :skills

	def create_skills
		ActiveRecord::Base.transaction do
			Operator.joins(:section).where("sections.name = ?", section_name).each do |op|
				skills.create(operator: op, value: 0)
			end
		end
	end

	def delete_skills
		ActiveRecord::Base.transaction do
			Skill.where("operation_id = ?", id).each do |skill|
				skill.destroy
			end
		end
	end
end
