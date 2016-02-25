class ApplicationController < ActionController::Base
	# Prevent CSRF attacks by raising an exception.
	# For APIs, you may want to use :null_session instead.
	protect_from_forgery with: :exception

	after_filter :flash_to_headers

	before_action :authenticate_user!
	before_action :configure_permitted_parameters, if: :devise_controller?

	def flash_to_headers
		return unless request.xhr?
		return if flash.empty?
	    response.headers['X-FlashMessages'] = flash.to_hash.to_json
	    flash.discard
	end

	protected

	def configure_permitted_parameters
		devise_parameter_sanitizer.for(:sign_up)        << :name
	end
end