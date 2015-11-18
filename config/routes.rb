Rails.application.routes.draw do
  resources :messages, only: [:create]
  get '/' => 'messages#index', as: 'root'
  get '/pong' => 'messages#pong', as: 'pong'
end
