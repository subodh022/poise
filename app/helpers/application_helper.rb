module ApplicationHelper

	def flash_class(level)
		case level
			when 'notice'
				'alert alert-info'
			when 'success'
				'alert alert-success'
			when 'error', 'alert'
				'alert alert-error'
			else
				'alert alert-error'
		end
	end
end
