class Operation < ActiveRecord::Base

	has_many :skills

	def create_skills
		ActiveRecord::Base.transaction do
			Operator.all.each do |op|
				skills.create(operator: op, value: 0)
			end
		end
	end
end
