const socket = io();

document.querySelector('#coopButton').addEventListener('click', () => {
    console.log('Coop button clicked');
    socket.emit('gameModeSelected', 'coop');
});

document.querySelector('#competeButton').addEventListener('click', () => {
    console.log('Compete button clicked');
    socket.emit('gameModeSelected', 'compete');
});