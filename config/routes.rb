Rails.application.routes.draw do
  devise_for :users
  resources :food_carts do
    collection do
      get 'tags'
    end
    resources :reviews
  end
  resources :tags
  root 'food_carts#index'
end
