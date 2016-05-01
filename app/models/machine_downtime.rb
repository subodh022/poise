class MachineDowntime < ActiveRecord::Base

	belongs_to :work_station

	validates :downtime, presence: true
	
end
