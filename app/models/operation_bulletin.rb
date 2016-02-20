class OperationBulletin < ActiveRecord::Base

	belongs_to :line
	has_many :work_stations


	def line_name
		line.title
	end
end
