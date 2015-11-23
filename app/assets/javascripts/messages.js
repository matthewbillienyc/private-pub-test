$(function(){
  PrivatePub.subscribe("/messages/new", function(data, channel) {
    $("ul#chat").append(data.chat_message);
    $("input[name='content']").val('');
    var messages = $('ul#chat li')
    $('ul#chat').animate({scrollTop: $('ul#chat').get(0).scrollHeight}, 1000);
  });
})
