class OperatorDeviation < ActiveRecord::Base

	def from_ws
		WorkStation.find_by_id(new_ws_id)
	end

	def to_ws
		WorkStation.find_by_id(old_ws_id)
	end

end
