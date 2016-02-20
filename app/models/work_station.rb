class WorkStation < ActiveRecord::Base

	belongs_to :operation_bulletin
	belongs_to :operation
	belongs_to :machine
	belongs_to :section

	def self.stations(ob_id, section_id)
		where("operation_bulletin_id = ? and section_id = ?", ob_id, section_id)
	end
end
