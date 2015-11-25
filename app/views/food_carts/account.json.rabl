object @food_carts
attributes *FoodCart.column_names - ["created_at", "updated_at"]

child :tags, object_root: false do
  attributes :name
end

child :reviews, object_root: false do
  attributes :rating, :content, :id, :updated_at
  child :user do
    attributes :username
  end
end
