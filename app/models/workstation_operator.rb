class WorkstationOperator < ActiveRecord::Base

	belongs_to :work_station
	belongs_to :operator

	has_many :attendances

end
