class AddFacebookAndTwitterToFoodCarts < ActiveRecord::Migration
  def change
    add_column :food_carts, :twitter, :string
    add_column :food_carts, :facebook, :string
  end
end
