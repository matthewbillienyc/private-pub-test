$(function(){

  $("#chatbox").on('ajax:success', function(e, data, success, xhr){
    $("ul").append(data.message_partial);
  });

});
