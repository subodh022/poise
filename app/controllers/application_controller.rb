class ApplicationController < ActionController::Base
	# Prevent CSRF attacks by raising an exception.
	# For APIs, you may want to use :null_session instead.
	protect_from_forgery with: :exception

	after_filter :flash_to_headers

	def flash_to_headers
		return unless request.xhr?
		return if flash.empty?
	    response.headers['X-FlashMessages'] = flash.to_hash.to_json
	    flash.discard
	end
end