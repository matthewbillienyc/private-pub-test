class PongsController < ApplicationController
  def p1up
    PrivatePub.publish_to "/p1up", {}
    render nothing: true
  end

  def p1down
    PrivatePub.publish_to "/p1down", {}
    render nothing: true
  end

  def p2up
    PrivatePub.publish_to "/p2up", {}
    render nothing: true
  end

  def p2down
    PrivatePub.publish_to "/p2down", {}
    render nothing: true
  end

  def space
    x = [-6, 6].sample
    # y = [-1,0,1].sample
    y = [-2, 2].sample
    PrivatePub.publish_to "/space", {:x => x, :y => y}
    render nothing: true
  end

  def start
    PrivatePub.publish_to "/start", {}
    render nothing: true
  end

  def p1select
    PrivatePub.publish_to "/p1select", {}
    render nothing: true
  end

  def p2select
    PrivatePub.publish_to "/p2select", {}
    render nothing: true
  end

  def step
    PrivatePub.publish_to "/step", {}
    render nothing: true
  end

  def reset
    PrivatePub.publish_to "/reset", {}
    render nothing: true
  end

  # def collision
  #   PrivatePub.publish_to "/collision", {ballX: params["ballX"], ballY: params["ballY"], ballXSpeed: params["ballXSpeed"], ballYSpeed: params["ballYSpeed"]}
  #   render nothing: true
  # end
end