$(function(){

  
  PrivatePub.subscribe("/messages/new", function(data, channel) {
    $("ul").append(data.chat_message);
  });
  
})
