json.machines do
  json.array! @machines, :name, :mac_id, :attachment, :available_units
end