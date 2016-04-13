class Api::V1::SectionsController < ApiController

	def index
	  @all_section = [{id: "0", name: "All Sections"}]
	  @sections = Section.select("id, name").where(line_id: params[:line_id], enabled: true)
	end

end
