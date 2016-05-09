class Machine < ActiveRecord::Base

	belongs_to :line

	def available_units
		tot_units - used_units
	end

	def self.update_unit_count(type, new_mac_id, old_mac_id=0)
		return if new_mac_id.blank?

		case type
		when "add"
			Machine.find(new_mac_id).increment!(:used_units)
		when "update"
			unless new_mac_id == old_mac_id
				Machine.find(new_mac_id).increment!(:used_units)
				Machine.find(old_mac_id).decrement!(:used_units)
			end
		when "delete"
			Machine.find(new_mac_id).decrement!(:used_units)
		end
	end

end
