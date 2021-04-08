class AddMajorIdAndCatalogIdToPlans < ActiveRecord::Migration[6.1]
  def change
    add_column :plans, :major_id, :integer
    add_column :plans, :catalog_id, :integer
  end
end
