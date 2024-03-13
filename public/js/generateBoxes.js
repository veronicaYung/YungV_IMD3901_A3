'use strict';
AFRAME.registerComponent('generateboxes', {
    init: function() {
        const spawnArea = document.querySelector('#spawnArea');
        const colors = ['#008000', '#0000FF', '#FF007F', '#FF7518']; // Colors of the floors

        this.el.addEventListener('startGame', (event) => {
            for (let color of colors) {
                for (let i = 0; i < 20; i++) {
                    // Create a new box
                    const box = document.createElement('a-box');

                    // Set the box's color
                    box.setAttribute('material', 'color', color);
                    box.classList.add('interactive');
                    box.setAttribute('id', 'box');
                    // Allow these boxes to be picked up
                    box.setAttribute('pickup', '');

                    // Set the box's position to a random position within the spawn area
                    const x = Math.random() * 30 - 15 + spawnArea.getAttribute('position').x; // Random x-coordinate within the spawn area
                    const y = 0.5; // Y-coordinate (half the height of the box to make it appear on the floor)
                    const z = Math.random() * 30 - 15 + spawnArea.getAttribute('position').z; // Random z-coordinate within the spawn area
                    box.setAttribute('position', `${x} ${y} ${z}`);

                    // Add the box to the scene
                    document.querySelector('a-scene').appendChild(box);
   
                }
            }
        });
    },
});