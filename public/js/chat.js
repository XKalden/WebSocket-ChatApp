var socket = io();

function scrollToBottom () {
    // Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child')
    // Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();
  
    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }
  }
  


socket.on('connect', function(){
    console.log('Connected to server');


});

socket.on('disconnect', function(){
    console.log('Disconnected from server');
});

// email 
socket.on('newMessage', function(message) {
  
    // mustache
    var formattedTime = moment(message.createdAt).format('h:mm a');

    var template = $('#message-template').html();

    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });



    $('#messages').append(html);

    scrollToBottom();


    // var formattedTime = moment(message.createdAt).format('h:mm a');

    // var li = $('<li></li>');
    // li.text(`${message.from} ${formattedTime}: ${message.text}`);

    // jQuery('#messages').append(li);

});


// locaiton messsage
socket.on('newLocationMessage', function(message){
    var formattedTime = moment(message.createdAt).format('h:mm a');


    var template = $('#location-message-template').html();

    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        url: message.url,
        createdAt: formattedTime

    });


    $('#messages').append(html);

    scrollToBottom();

    // var li = $('<li></li>');
    // var a = $('<a target="_blank"> My Current Locaiton </a>');

    // li.text(`${message.from} ${formattedTime}: `);
    // a.attr('href', message.url);
    // li.append(a);

    // $('#messages').append(li);



    // console.log('it worked1!!!')
});




$('#message-form').on('submit', function(e){
    e.preventDefault();

    var messageTextbox = $('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function(){
        console.log('WOKRED')

        messageTextbox.val('');

    });

});


var locationButton = jQuery('#send-location');
locationButton.on('click', function(){

    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser');
    } 



    locationButton.attr('disabled', 'disabled').text('Sending Wait...');


    navigator.geolocation.getCurrentPosition(function(Position){

        locationButton.removeAttr('disabled').text('Send Location');
        
        socket.emit('createLocationMessage', {
            latitude: Position.coords.latitude,
            longitude: Position.coords.longitude
        });

    }, function(){
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location');
    });
    console.log(navigator);

});











