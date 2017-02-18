// YOUR CODE HERE:
var app = {};
app.init = function () {

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
};

app.renderMessage = function (message) {
  var msg = document.createElement('p');
  msg.innerHTML = message;
  document.getElementById('chats').appendChild(msg);
};

app.renderRoom = function (chatRoom) {
  var room = document.createElement('option');
  room.innerHTML = chatRoom;
  document.getElementById('roomSelect').appendChild(room);
};  