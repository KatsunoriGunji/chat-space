$(document).on('turbolinks:load', function() {
//$(function() {
    function buildMessage(data) {
        var imageHTML = data.image ? `<img class="lower-message__image" src=${data.image} alt="Image">` : ""
        var html = `<div class="message" data-id=' ${data.id} '>
                      <div class="message__info">
                        <div class="username">
                          ${data.user_name}
                        </div>
                        <div class="timestamp">
                          ${data.created_at}
                        </div>
                      </div>
                      <div class="message__text">
                        <p class="lower-message__content">
                          ${data.content}
                        </p>
                        ${imageHTML}
                      </div>
                    </div>`
        return html
    }
    var reloadMessages = function() {
      var ids = []
      $(".middle-contents").children().each(function(index, message){
        ids.push($(message).data('id'));
      });
      last_message_id = Math.max.apply(null, ids);
      var url = location.href.split('/');
      var group_id = url[url.length - 2];
      $.ajax({
        url: `/groups/${group_id}/api/messages`,
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
      .done(function(messages) {
        $(messages).each(function(index, message){
          messageHTML = buildMessage(message);
          $('.middle-contents').append(messageHTML);
        });
      })
      .fail(function() {
      });
      scrollBottom();
    };
    function scrollBottom() {
        var target = $('.message').last();
        var position = target.offset().top + $('.middle-contents').scrollTop();
        $('.middle-contents').animate({
            scrollTop: position
        }, 300, 'swing');
    }
    $("#new_message").on("submit", function(e) {
        var input = $("#message_content").val();
        var formData = new FormData(this);
        e.preventDefault();

        $.ajax({
            type: 'POST',
            url: (window.location.href),
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
        })
        .done(function(data) {
            var html = buildMessage(data);
            $('.middle-contents').append(html);
            $("#new_message")[0].reset();
            scrollBottom();
        })
        .fail(function(data) {
            alert('エラー');
        })
        .always(function(data) {
            $('.send-button').prop('disabled', false);
        })
    });
    var url = location.href.split('/');
    if ( url[url.length - 1] == "messages" ){
    console.log(url[url.length - 1]);
    setInterval(reloadMessages, 1000);
    }
    else {
      console.log(url[url.length - 1]);}
});