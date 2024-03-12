AFRAME.registerComponent('timer', {
    schema: {
        countdown: {type: 'number', default: 30}
    },

    init: function () {
        this.el.addEventListener('startGame', () => {
            this.startCountdown();
        });
    },

    startCountdown: function () {
        this.data.countdown = 30;
        this.timerInterval = setInterval(() => {
            this.data.countdown--;
            console.log(`Time remaining: ${this.data.countdown}s`); // Log the countdown to the console

            this.el.setAttribute('text', 'value', `Time remaining: ${this.data.countdown}s`); // Corrected line
            if (this.data.countdown <= 0) {
                clearInterval(this.timerInterval);
            }
        }, 1000);
    }
});