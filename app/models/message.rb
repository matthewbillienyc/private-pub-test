class Message < ActiveRecord::Base

  def self.display_latest_messages
    self.all[-5..-1]
  end

end
