class SectionsController < ApplicationController

	def enable
		Section.find(params[:id]).update_attributes(enabled: params[:enabled])
		render :text => "Success"
	end
end
