class AddDhuToOperations < ActiveRecord::Migration
  def change
    add_column :operations, :dhu, :float, default: 0.0
  end
end
