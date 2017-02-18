// YOUR CODE HERE:
var app = {};
$(document).ready(function () {
  // $('#main).app.handleUsernameClick();
  // app.handleSubmit().bind(this);
  $('#message').click(function() {
    $('#message').innerHTML = ' ';
  });
  $('#message').keypress(function(e) {
    if (e.which === 13) {
      $('#send').trigger('click');
    }
  });
  app.handleSubmit();
});

window.messagesStorage = [];

app.init = function () {
  $('#user').on('click', app.handleUsernameClick());
  $('#user').on('click', app.handleSubmit());
};



app.send = function (message) {
  $.ajax({
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox; Message sent');
    },
    error: function(data) {
      console.error('chatterbox: Failed to send message');
    }
  });

};

app.fetch = function () {
  $.ajax({
    type: 'GET',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox; Message sent');
    },
    error: function(data) {
      console.error('chatterbox: Failed to send message');
    }
  });
};  

app.clearMessages = function () {
  $('#chats').html('');
  $('#message').innerHTML = '';
};

app.renderMessage = function (obj) {
  var msg = document.createElement('p');
  var atag = document.createElement('a');
  atag.innerHTML = obj.username;
  msg.innerHTML = obj.text;
  $('#chats').append('<a href = "#" onclick="app.handleUsernameClick">' + obj.username + '</a>');
  $('#chats').append('<p>' + obj.text + '</p>');
};

  

app.renderRoom = function (chatRoom) {
  var room = document.createElement('option');
  room.innerHTML = chatRoom;
  document.getElementById('roomSelect').appendChild(room);
};  

app.handleUsernameClick = function () {
  var user = document.getElementById('user');
  console.log('user clicked!');
  $('a').on('click', function () {
  
  });
};

app.getUserName = function () {
  var string = window.location.search;
  var arr = string.split('');
  var index;
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === '=') {
      index = i + 1;
    }
  }
  return arr.slice(index).join('');
};

var userName = app.getUserName();
//console.log(app.getUserName());

app.handleSubmit = function (value) {
  //var text = getElementById('message').innerHTML;
  $('#send').click(function() {
    var text = $('#message').val();
    var input = {
      username: userName,
      text: text};

    if (input.text !== '') {  
      app.renderMessage(input);
    }
    
    document.getElementById('message').value = '';
  });

};



// app.handleUsernameClick.on('click', function () {
//   return true;
// });