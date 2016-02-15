class Line < ActiveRecord::Base

	has_many :sections
	has_many :operators
	
end
