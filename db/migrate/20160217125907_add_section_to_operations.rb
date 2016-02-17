class AddSectionToOperations < ActiveRecord::Migration
  def change
    add_column :operations, :section_name, :string, index: true
  end
end