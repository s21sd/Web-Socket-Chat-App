const socket = io('http://localhost:8000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector('.container');
var audio = new Audio('ting.mp3');

//  append new user
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();

    }
}

// for form

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})

const name = prompt('Enter your name');
socket.emit('new-user-joined', name);
console.log("Woking ")

socket.on('user-joined', name => {
    append(`${name} joined the chat `, 'right')
})

socket.on('receive', data => {
    append(`${data.name}:${data.message}`, 'left')
})


socket.on('left', data => {
    append(`${data.name} is offline`, 'right')
})