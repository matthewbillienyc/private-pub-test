class MessagesController < ApplicationController

  def index
    render 'messages/index.html.erb'
  end

  def create
    message_partial = render_to_string(partial: '/messages/message', locals: {message: params["content"], name: params["player"]})
    PrivatePub.publish_to "/messages/new", :chat_message => message_partial
    render nothing: true
  end

end