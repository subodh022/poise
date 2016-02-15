class Operator < ActiveRecord::Base

	belongs_to :line
	has_many :skills

	def create_skills
		ActiveRecord::Base.transaction do
			Operation.all.each do |op|
				skills.create(operation: op, value: 0)
			end
		end
	end
end
