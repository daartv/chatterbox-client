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
});

window.userStorage = [];

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
      console.log(data);
      // console.log('chatterbox; Message fetch');
      for (var i = data.results.length - 1; i >= 0; i--) {     
        app.renderMessage(data.results[i]);
        app.renderRoom(data.results[i]);
      }
    },
    error: function(data) {
      console.error('chatterbox: This is a \'failed to send\' message from app.fetch');
    }
  });
};  


app.clearMessages = function () {
  $('#chats').html('');
  $('#message').innerHTML = '';
};

app.renderMessage = function (obj) {
  // var msg = document.createElement('p');
  // var atag = document.createElement('a');
  // // atag.innerHTML = obj.username;
  // msg.innerHTML = obj.text;
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
  $('#chats').prepend('<p>' + _.escape(obj.text) + '</p>');
  $('#chats').prepend('<a href = "#" onclick="app.handleUsernameClick()">' + _.escape(obj.username) + '</a>');
};

  

app.renderRoom = function (chatRoom) {
  $('#roomSelect').append( chatRoom.roomname);
 // room.innerHTML = chatRoom;
  //document.getElementById('roomSelect').appendChild(room);
};  

app.handleUsernameClick = function (data) {
  userStorage.push($('a'));
  console.log('user clicked!');
  //console.log(data.username);
  
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
      text: text,
      //roomname: roomname
    };

    if (input.text !== '') {  
      app.renderMessage(input);
      app.send(input);
    }
    
    document.getElementById('message').value = '';
  });

};



// app.handleUsernameClick.on('click', function () {
//   return true;
// });