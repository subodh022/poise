class Section < ActiveRecord::Base

	belongs_to :line
	has_many :operators
	has_many :work_stations

	def self.get_workstations(ob)
		self.includes(:work_stations => [:operation, :machine])
			.select("sections.*, work_stations.*")
			.where("sections.line_id = ? and sections.enabled = true and work_stations.operation_bulletin_id = ?", ob.line.id, ob.id)
			.references(:work_stations)
			.to_json(:include => { :work_stations => { :methods => [:operation_name, :machine_name] }})
	end

	def ob_work_stations(ob_id)
		work_stations.where("operation_bulletin_id = ?", ob_id).order("id")
	end

	def get_operations
		Operation.where("section_name = ?", name)
	end
	
end
