$(document).on("turbolinks:load", function(){
  $(window).off('scroll');
  function buildHTMLadd(user){
    html = `<div class="chat-group-user clearfix" id="chat-group-user-${user.id}">
              <p class="chat-group-user__name">${user.name}</p>
              <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
            </div>`;
    return html;
  }
  function buildHTMLremove(user){
    html = `<div class='chat-group-user' id='chat-group-user-remove-${user.id}'>
              <input name='group[user_ids][]' type='hidden' value='${user.id}'>
              <p class='chat-group-user__name'>${user.name}</p>
              <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn' data-user-id="${user.id}" data-user-name="${user.name}">削除</div>
            </div>`
    return html
  }
  $("#user-search-field").on("keyup", function(e){
    var input = $('#user-search-field').val();
    e.preventDefault();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(data) {
      $('#user-search-result').empty();
      if ($(data.users).length !== 0){
        $(data.users).each(function(i, user){
          var html = buildHTMLadd(user);
          $('#user-search-result').append(html);
        })
      }
      else  {
      }
    })
    .fail(function(data){
      alert('エラー');
    })
  });
  $(document).on("click", '.chat-group-user__btn--add', function(){
    var i = 0;
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { user_id: $(this).attr('data-user-id'),
              user_name: $(this).attr('data-user-name')},
      dataType: 'json'
    })
    .done(function(data) {
      user = data.user
      if (user.id !== null){
          var html = buildHTMLremove(user);
          $('#chat-group-form__field--right').append(html);
          $(`#chat-group-user-${user.id}`).remove();
      }
    });
  });
  $(document).on("click", '.chat-group-user__btn--remove', function(){
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { user_id: $(this).attr('data-user-id'),
              user_name: $(this).attr('data-user-name') },
      dataType: 'json'
    })
    .done(function(data) {
      user = data.user
      if (user !== null){
          $(`#chat-group-user-remove-${user.id}`).remove();
          var html = buildHTMLadd(user);
          $('#user-search-result').append(html);
      }
    });
  });
});