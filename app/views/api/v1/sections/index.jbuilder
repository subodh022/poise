json.array!(@all_section) do |section|
	json.section do
		json.id section[:id]
		json.name section[:name]
	end 
end
json.array!(@sections) do |section|
	json.section do
		json.id section.id
		json.name section.name
	end 
end
