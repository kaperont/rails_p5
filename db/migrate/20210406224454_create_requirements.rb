class CreateRequirements < ActiveRecord::Migration[6.1]
  def change
    create_table :requirements do |t|
      t.integer :Catalog_ID
      t.integer :Major_ID
      t.integer :Category_ID

      t.timestamps
    end
  end
end
