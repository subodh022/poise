json.machines do
  json.array! @machines, :id, :name, :mac_id, :attachment, :available_units
end