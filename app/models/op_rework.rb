class OpRework < ActiveRecord::Base

	belongs_to :work_station

	validates :rework, presence: true
end
