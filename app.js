const express = require ('express');
const app = express();
const http = require ('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

const LISTEN_PORT = 8080

// Middle ware to serve static files ad public folder as root
app.use(express.static(__dirname+'/public'));
// create our routes 
app.get('/',function(req,res){
    res.sendFile(__dirname + '/public/index.html');
})

function generateBoxes() {
    const colors = ['#008000', '#0000FF', '#FF007F', '#FF7518']; // Colors of the boxes
    const boxes = [];

    for (let color of colors) {
        for (let i = 0; i < 20; i++) {
            // Generate a random position within the spawn area
            const x = Math.random() * 30 + 7; // Random x-coordinate within the spawn area
            const y = 0.7; // Y-coordinate (half the height of the box to make it appear on the floor)
            const z = Math.random() * 30 - 19; // Random z-coordinate within the spawn area

            // Create a new box
            const box = {
                color: color,
                position: `${x} ${y} ${z}`
            };

            boxes.push(box);
        }
    }

    return boxes;
}

let players = [];
// socket.io events
io.on('connection',(socket)=>{
    console.log('A user connected: ' + socket.id);
    players.push(socket.id);

    if(players.length === 1){
        io.emit('waitingForPlayer');
    } else if(players.length === 2){
        io.emit('bothPlayersConnected')
    }
    socket.on('disconnect',() =>{
        console.log(socket.id + "is disconnected");
        // create new player array without the disconnected player
        players = players.filter(player => player !== socket.id);
    });

    socket.on('waitingForPlayer', () => {
        document.getElementById('message').textContent = 'Waiting for player 2...';
    });

    socket.on('gameModeSelected', (gameMode) => {
        io.emit('startGame', gameMode);
        const boxes = generateBoxes();
        io.emit('boxesGenerated', boxes);
    });
    socket.on('boxPickedUp_s', (boxData) => {
        console.log("recieved boxPickedup");
        io.emit('boxPickedUp_c', boxData);
    });

    socket.on('boxDropped_s', (boxData) => {
        io.emit('boxDropped_c', boxData);
    });
    socket.on('timerEnded', (gameMode) => {
        io.emit('gameOver', gameMode);
    });

}); 

// Deault--------------------------------
server.listen(LISTEN_PORT);
console.log("server started on port"+LISTEN_PORT);