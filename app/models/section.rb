class Section < ActiveRecord::Base

	belongs_to :line
	has_many :operators
	
end
