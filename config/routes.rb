Rails.application.routes.draw do
  devise_for :users
  resources :food_carts do
    collection do
      get :filter
      get :account
    end
    resources :reviews
  end
  resources :tags
  root 'food_carts#index'
end
