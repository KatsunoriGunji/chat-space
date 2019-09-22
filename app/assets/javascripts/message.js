$(function() {
    $("#new_message").on("submit", function(e) {
        var input = $("#message_content").val();
        var formData = new FormData(this);

        function buildMessage(data) {
            var imageHTML = data.image ? `<img class="lower-message__image" src=${data.image} alt="Image">` : ""
            var html = `<div class="message">
                          <div class="message__info">
                            <div class="username">
                              ${data.user_name.name}
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

        function scrollBottom() {
            var target = $('.message').last();
            var position = target.offset().top + $('.middle-contents').scrollTop();
            $('.middle-contents').animate({
                scrollTop: position
            }, 300, 'swing');
        }
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
            var message = buildMessage(data);
            $('.middle-contents').append(message);
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
});