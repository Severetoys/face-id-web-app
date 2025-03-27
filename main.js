// main.js

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('video');
    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', async () => {
        await startVideo();
        // Additional initialization code can go here
    });

    async function startVideo() {
        const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
        video.srcObject = stream;
        video.play();
    }

    // Additional functions for handling user interactions can be added here
});