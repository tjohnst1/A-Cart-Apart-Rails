class RemoveZipFromFoodCarts < ActiveRecord::Migration
  def change
    remove_column :food_carts, :zip
  end
end
