const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

async function setupCamera() {
    const stream = await navigator.mediaDevices.getUserMedia({
        video: true
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
        video.onloadedmetadata = () => {
            resolve(video);
        };
    });
}

async function loadFaceApi() {
    await faceapi.nets.tinyFaceDetector.loadFromUri('/lib');
    await faceapi.nets.faceLandmark68Net.loadFromUri('/lib');
    await faceapi.nets.faceRecognitionNet.loadFromUri('/lib');
}

async function detectFace() {
    const detections = await faceapi.detectAllFaces(video, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceDescriptors();
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    faceapi.draw.drawDetections(canvas, detections);
    faceapi.draw.drawFaceLandmarks(canvas, detections);
}

async function start() {
    await loadFaceApi();
    await setupCamera();
    video.play();

    setInterval(detectFace, 100);
}

start();