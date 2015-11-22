object @food_cart
attributes *FoodCart.column_names - ["created_at", "updated_at", "longitude", "latitude"]

child :tags, object_root: false do
  attributes :name
end

child :reviews, object_root: false do
  attributes :rating, :content, :id
  child :user do
    attributes :username
  end
end
