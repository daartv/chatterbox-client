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
  app.fetch();


  $('#thisuser').on('click', function () {
    var clickedBtnID = $(this).attr('id'); // or var clickedBtnID = this.id
    console.log('you clicked on button #' + clickedBtnID);
  });


});

var messages = [];

window.friends = {};

app.init = function () {
  $('#user').on('click', app.handleUsernameClick());
  $('a').on('click', app.handleSubmit());

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
    url: 'http://parse.sfm6.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {'order': '-createdAt'},
    contentType: 'application/json',
    // dataType: 'json',
    success: function (data) {
      app.messages = data.results;
      var mostRecentMessage = app.messages[app.messages.length - 1];
      if (mostRecentMessage.objectId !== app.lastMessageId) {
        app.renderMessage(app.messages);
        app.renderRoomList(app.messages);
      }     
    },
    error: function(data) {
      console.error('chatterbox: This is a \'failed to send\' message from app.fetch');
    }
  });
};  
//console.log(window.chatRooms);
app.clearMessages = function () {
  $('#chats').html('');
  $('#message').innerHTML = '';
};

app.renderMessage = function (obj) {
  // var msg = document.createElement('p');
  // var atag = document.createElement('a');
  // // atag.innerHTML = obj.username;
  // msg.innerHTML = obj.text;
  $('#chats').prepend('<p>' + _.escape(obj.text) + '</p>');
  $('#chats').prepend('<a href = "#" onclick="app.handleUsernameClick()" id="thisuser">' + _.escape(obj.username) + '</a>');

};

var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#x27;',
  '/': '&#x2F;'
};
var htmlEscaper = /[&<>"'\/]/g;
_.escape = function(string) {
  return ('' + string).replace(htmlEscaper, function(match) {
    return htmlEscapes[match];
  });
};
  

app.renderRoomList = function (data) {

  $('#roomSelect').html('<option value="__newRoom">New room...</option></select>');
  if (data) {
    var rooms = {};
    data.forEach(function(message) {
      var roomname = message.roomname;
      if (roomname && !rooms[roomname]) {
        app.renderRoom(roomname);
      }
    });
  }
};

app.renderRoom = function (roomname) {
  var $option = $('<option/>').val(roomname).text(roomname);
  $('#roomSelect').append($option);
};

app.handleUsernameClick = function () {

  console.log($('#thisuser'));
  
  
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
//console.log(userName)

app.handleSubmit = function (value) { 
  var input = {
    username: app.userName,
    text: $('#message').val(),
    roomname: app.roomname || 'lobby'
  };

  //var text = getElementById('message').innerHTML;
  $('#send').click(function() {
    if (input.text !== '') {  
      app.renderMessage(input);
      app.send(input);
    }
    
    document.getElementById('message').value = '';
  });
};
