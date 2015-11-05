class AddLatitudeAndLongitudeToFoodCarts < ActiveRecord::Migration
  def change
    add_column :food_carts, :longitude, :string
    add_column :food_carts, :latitude, :string
  end
end
