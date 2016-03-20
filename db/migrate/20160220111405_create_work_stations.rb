class CreateWorkStations < ActiveRecord::Migration
  def change
    create_table :work_stations do |t|      
      t.belongs_to :operation_bulletin, index: true
      t.belongs_to :section, index: true
      t.belongs_to :operation, index: true
      t.belongs_to :machine, index: true
      t.belongs_to :operator, index: true

      t.timestamps null: false
    end
  end
end