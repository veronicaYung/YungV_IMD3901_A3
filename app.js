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
app.get('/2d',function(req,res){
    res.sendFile(__dirname + '/public/2d.html');
})
app.get('/3d',function(req,res){
    res.sendFile(__dirname + '/public/3d.html');
})

//wesocket stuff
// send an event when the red or blue button is clicked in 2d so that its updated in 3d
io.on('connection',(socket)=>{
    console.log(socket.id + "is connected");
    socket.on('disconnect',() =>{
        console.log(socket.id + "is disconnected");
    });

    //custom events 
    socket.on('red', (data)=>{
        console.log("red event recieved");
        io.emit('color_change',{r:255, g:0,b:0});
    });

    socket.on('blue', (data)=>{
        console.log("blue event recieved");
        io.emit('color_change',{r:0, g:0,b:255});
    });
});
server.listen(LISTEN_PORT);
console.log("server started on port"+LISTEN_PORT);
