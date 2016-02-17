class Operator < ActiveRecord::Base

	belongs_to :line
	belongs_to :section
	has_many :skills

	def create_skills
		ActiveRecord::Base.transaction do
			Operation.where("section_name = ?", section_name).each do |op|
				skills.create(operation: op, value: 0)
			end
		end
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
end
