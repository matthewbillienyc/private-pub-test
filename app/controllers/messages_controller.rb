class MessagesController < ApplicationController

  def index
    @messages = Message.display_latest_messages
  end

  def create
    @message = Message.create(message_params)
    message_partial = render_to_string(partial: '/messages/message', locals: {message: @message})
    PrivatePub.publish_to "/messages/new", :chat_message => message_partial
  end

  def pong
  end

  private

    def message_params
      params.require(:message).permit(:content)
    end

end