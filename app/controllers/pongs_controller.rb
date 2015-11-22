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
    PrivatePub.publish_to "/space", {}
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

end