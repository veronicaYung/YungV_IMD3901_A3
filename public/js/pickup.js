'use strict';

AFRAME.registerComponent('pickup', {
    schema: {
        isPickedUp: { default: false },
        isIntersecting: { default: false },
    },

    init: function () {
        var cursor = document.querySelector('#cursor');
        var camera = document.querySelector('#camera');
        var attachedBox = document.querySelector('#attachedBox');

        //  Store the first intersected element
        cursor.addEventListener('raycaster-intersection', (event) => {
            this.data.intersectedEl = event.detail.els[0]; 
            this.data.isIntersecting = true;
        });

        // Reset is intersecting when the cursor is not intersecting with anything
        cursor.addEventListener('raycaster-intersection-cleared', () => {
            this.data.isIntersecting = false;
        });

        // On mouse down, if the cursor is intersecting with the box, make the box invisible and make attached box visible to the camera
        window.addEventListener('mousedown', () => {
            console.log(this.data.intersectedEl)
            if (!this.data.isPickedUp && this.data.isIntersecting && this.data.intersectedEl.id === 'box') {
                this.data.intersectedEl.setAttribute('visible', 'false');
                attachedBox.setAttribute('visible', 'true');
                this.data.isPickedUp = true;
                // Getting the color of the picked-up box
                var color = this.data.intersectedEl.getAttribute('material').color;
                // Then set the color of attachedBox to be the color of the picked-up box
                attachedBox.setAttribute('material', 'color', color);
                // On pick up, play the sound
                var pickupSound = document.querySelector('#pickupSound');
                pickupSound.play();
            }
        });
        
        // On mouse up, if the box is picked up, set the box's position to the camera's position and make the original box visible, attached box invisdible
        window.addEventListener('mouseup', () => {
            if (this.data.isPickedUp) {
                var cameraDirection = camera.object3D.getWorldDirection(new THREE.Vector3());
                var dropPosition = cameraDirection.multiplyScalar(-1).add(camera.object3D.position);
                dropPosition.y -= 1;
                this.data.intersectedEl.setAttribute('position', dropPosition);
                this.data.intersectedEl.setAttribute('visible', 'true');
                attachedBox.setAttribute('visible', 'false');
                this.data.isPickedUp = false;
            }
        });
    }
});