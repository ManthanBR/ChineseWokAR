} from '@snap/camera-kit';

const liveRenderTarget = document.getElementById('canvas') as HTMLCanvasElement;
const flipCamera = document.getElementById('flip') as HTMLButtonElement; // Use the correct type

let isBackFacing = true;
let mediaStream: MediaStream;

async function init() {
const cameraKit = await bootstrapCameraKit({
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzI2NTY1MzEwLCJzdWIiOiIyN2NmNDQwYy04YjBkLTQ5ZDEtYTM2MC04YjdkODQ5OTM3ZWJ-U1RBR0lOR340Y2ZhYTJiOC1kYWY4LTRhZDYtODYwNy1iMmI5NWYzMDVmMzAifQ.q8qMDDOzMv4jFiZ8NRqQ8-qDJMV4l5YmOex67WC6DqI',
    apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzI2NTY1MzEwLCJzdWIiOiIyN2NmNDQwYy04YjBkLTQ5ZDEtYTM2MC04YjdkODQ5OTM3ZWJ-U1RBR0lOR340Y2ZhYTJiOC1kYWY4LTRhZDYtODYwNy1iMmI5NWYzMDVmMzAifQ.q8qMDDOzMv4jFiZ8NRqQ8-qDJMV4l5YmOex67WC6DqI',  // Use your actual API token
});

const session = await cameraKit.createSession({ liveRenderTarget });
@@ -23,51 +21,24 @@ async function init() {

session.applyLens(lenses[0]);

  bindFlipCamera(session);
}

function bindFlipCamera(session: CameraKitSession) {
  if (flipCamera) {  // Check if flipCamera is not null
    flipCamera.style.cursor = 'pointer';

    flipCamera.addEventListener('click', () => {
      updateCamera(session);
    });
  }

  // Initialize the camera to use the back camera by default
updateCamera(session);
}

async function updateCamera(session: CameraKitSession) {
  isBackFacing = !isBackFacing;

  if (flipCamera) {
    flipCamera.innerText = isBackFacing
      ? 'Switch to Front Camera'
      : 'Switch to Back Camera';
  }

  if (mediaStream) {
    session.pause();
    mediaStream.getVideoTracks()[0].stop();
  }

  // Request the back camera by default
mediaStream = await navigator.mediaDevices.getUserMedia({
video: {
      facingMode: isBackFacing ? 'environment' : 'user',
      facingMode: 'environment',  // Back camera
},
});

const source = createMediaStreamSource(mediaStream, {
    cameraType: isBackFacing ? 'environment' : 'user',  // Corrected camera type
    cameraType: 'environment',  // Using the back camera
});

await session.setSource(source);

  if (!isBackFacing) {
    source.setTransform(Transform2D.MirrorX);
  }

session.play();
}
