class CreatePlans < ActiveRecord::Migration[6.1]
  def change
    create_table :plans do |t|
      t.string :name
      t.integer :current_year
      t.string :current_semester

      t.timestamps
    end
  end
end
