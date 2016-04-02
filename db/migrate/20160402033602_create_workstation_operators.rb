class CreateWorkstationOperators < ActiveRecord::Migration
  def change
    create_table :workstation_operators do |t|
      t.belongs_to :work_station, index: true
      t.belongs_to :operator, index: true

      t.timestamps null: false
    end
  end
end
