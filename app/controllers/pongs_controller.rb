class PongsController < ApplicationController
  def p1up
    PrivatePub.publish_to "/p1up", {}
  end

  def p1down
    PrivatePub.publish_to "/p1down", {}
  end

  def p2up
    PrivatePub.publish_to "/p2up", {}
  end

  def p2down
    PrivatePub.publish_to "/p2down", {}
  end

  def space
    PrivatePub.publish_to "/space", {}
  end
end