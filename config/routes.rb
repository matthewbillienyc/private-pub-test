Rails.application.routes.draw do
  resources :messages, only: [:create]
  get '/' => 'messages#index', as: 'root'
end
