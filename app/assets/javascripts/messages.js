$(function(){

  
  PrivatePub.subscribe("/messages/new", function(data, channel) {
    $("ul#chat").append(data.chat_message);
    $("ul#chat").children("li:first").remove();
    $("input[name='message[content]']").val('');
  });
  
})
