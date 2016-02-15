class Skill < ActiveRecord::Base

	belongs_to :operator
	belongs_to :operation

	def operation_title
		operation.title
	end

end
