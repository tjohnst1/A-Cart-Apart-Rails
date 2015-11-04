class CreateFoodCarts < ActiveRecord::Migration
  def change
    create_table :food_carts do |t|
      t.string   :name
      t.string   :address
      t.string   :zip
      t.string   :phone_number
      t.string   :website
      t.string   :monday_hours
      t.string   :tuesday_hours
      t.string   :wednesday_hours
      t.string   :thursday_hours
      t.string   :friday_hours
      t.string   :saturday_hours
      t.string   :sunday_hours
      t.string   :website
      t.timestamps null: false
    end
  end
end
