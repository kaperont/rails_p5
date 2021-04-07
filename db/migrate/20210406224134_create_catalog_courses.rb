class CreateCatalogCourses < ActiveRecord::Migration[6.1]
  def change
    create_table :catalog_courses do |t|
      t.string :Course_ID
      t.integer :Catalog_ID

      t.timestamps
    end
  end
end
