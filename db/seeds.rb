# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

lines = []
lines << Line.create(title: "Line One")
lines << Line.create(title: "Line Two")
lines << Line.create(title: "Line Three")
lines << Line.create(title: "Line Four")

lines.each do |l|
  l.sections << Section.create(name: 'Collar', enabled: false)
  l.sections << Section.create(name: 'SMP', enabled: false)
  l.sections << Section.create(name: 'Canvas', enabled: false)
  l.sections << Section.create(name: 'Sleeve', enabled: false)
  l.sections << Section.create(name: 'Lining', enabled: false)
  l.sections << Section.create(name: 'Front & Back', enabled: false)
  l.sections << Section.create(name: 'Front', enabled: false)
  l.sections << Section.create(name: 'Back', enabled: false)
  l.sections << Section.create(name: 'Assembly 1', enabled: false)
  l.sections << Section.create(name: 'Assembly 2', enabled: false)
  l.sections << Section.create(name: 'Assembly 3', enabled: false)
  l.sections << Section.create(name: 'Assembly 4', enabled: false)
  l.sections << Section.create(name: 'Assembly 5', enabled: false)
  l.sections << Section.create(name: 'Assembly 6', enabled: false)
end