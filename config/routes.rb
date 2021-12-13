Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: "static_pages#root"
  mount ActionCable.server, at: '/cable'

  namespace :api, defaults: {format: :json} do 
    resources :users, only: [:create, :show, :index]
    resource :session, only: [:create, :destroy]
    resources :messages, only: [:create, :index, :update, :destroy]
    resources :channels, only: [:create, :index, :destroy, :update, :show]
    resources :channel_members, only: [:create, :destroy]
  end 

  resources :messages, only: [:show]
end
