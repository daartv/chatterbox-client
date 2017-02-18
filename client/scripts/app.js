// YOUR CODE HERE:
var app = {};
$(document).ready(function () {
  // $('#main).app.handleUsernameClick();
  // app.handleSubmit().bind(this);
  $('#message').click(function() {
    $('#message').innerHTML = ' ';
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
 // console.log(obj);
  obj.userName = userName;
  var msg = document.createElement('p');
  
  var atag = document.createElement('a');
  // var user = document.createTextNode(message.username);
  // atag.appendChild(user);
  //var h2 = document.getElementsByClassName('username');
  //console.log(h2);
  // h2.innerHTML = message.username;
  if (obj === undefined) {
    msg.innerHTML = '';
  } else {
    msg.innerHTML = obj.text;  
  }
 // document.getElementById('chats').appendChild(atag);

  document.getElementById('form').appendChild(msg);
};

  

app.renderRoom = function (chatRoom) {
  var room = document.createElement('option');
  room.innerHTML = chatRoom;
  document.getElementById('roomSelect').appendChild(room);
};  

app.handleUsernameClick = function () {
  var user = document.getElementById('user');

  $('#user').on('click', function () {
  
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
    console.log(text);
    var input = {
      username: userName,
      text: text};
    app.renderMessage(input);
    document.getElementById('message').value = '';
  });

};



// app.handleUsernameClick.on('click', function () {
//   return true;
// });