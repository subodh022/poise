class Machine < ActiveRecord::Base

	belongs_to :line

	def available_units
		tot_units - used_units
	end

end
