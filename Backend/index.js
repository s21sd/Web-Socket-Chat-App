// Node server that is going to handle our socket connections
const cors = require('cors');
const io = require('socket.io')(8000, {
    cors: {
        origin: '*',
    },
})

const users = {}; // to handle the users
io.on('connection', socket => {
    socket.on('new-user-joined', name => {
        console.log('New User ', name)
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);

    });
    socket.on('send', message => {
        socket.broadcast.emit('receive', {
            message: message,
            name: users[socket.id]
        })
    });
    socket.on('disconnect', message => {
        socket.broadcast.emit('left', {
            message: message,
            name: users[socket.id]
        });
        delete users[socket.id];
    });
})