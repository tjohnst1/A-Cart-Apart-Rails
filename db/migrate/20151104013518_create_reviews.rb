class CreateReviews < ActiveRecord::Migration
  def change
    create_table :reviews do |t|
      t.string :content
      t.string :rating
      t.integer :food_cart_id
      t.integer :user_id
      t.timestamps null: false
    end
  end
end
