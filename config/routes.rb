Rails.application.routes.draw do
  resources :messages, only: [:create]
  get '/' => 'messages#index', as: 'root'
  # get '/pong' => 'messages#pong', as: 'pong'
  post '/p1up' => 'pongs#p1up'
  post '/p1down' => 'pongs#p1down'
  post '/p2up' => 'pongs#p2up'
  post '/p2down' => 'pongs#p2down'
  post '/space' => 'pongs#space'
  post '/start' => 'pongs#start'
  post '/p1select' => 'pongs#p1select'
  post '/p2select' => 'pongs#p2select'
  post '/step' => 'pongs#step'
end
