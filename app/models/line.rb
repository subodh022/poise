class Line < ActiveRecord::Base

	has_many :sections
	has_many :operators
	has_many :machines
	has_many :enabled_sections, -> { where enabled: true }, :class_name => 'Section'
	has_many :operation_bulletins
	
end
