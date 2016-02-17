class AddSectionIdToOperators < ActiveRecord::Migration
  def change
    add_column :operators, :section_id, :integer, index: true
  end
end
