class MessagesController < ApplicationController

  def index
    @messages = Message.all
  end

  def create
    @message = Message.create(message_params)
    message_partial = render_to_string(partial: '/messages/message', locals: {message: @message})
    render json: {message_partial: message_partial}
  end

  private

    def message_params
      params.require(:message).permit(:content)
    end

end
