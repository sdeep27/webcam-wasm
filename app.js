let wam = {};
loadWASM().then(module => {
  wam = module;
}).catch(err => {
  console.log('Error in fetching module: ', err);
}).then(() => {
  //things to execute on page load only after module is loaded
  addButtons('WASM');
  addButtons('JS');
})


let width = 700;
let height = 500;
let pixels, filter = "Normal";
const canvas = document.getElementById('camCanv');
const webcam = document.createElement('video');
webcam.id = 'webcam';
webcam.setAttribute('autoplay', 'true');
canvas.setAttribute('width', width);
canvas.setAttribute('height', height);
const cw = canvas.width, ch = canvas.height;
context = canvas.getContext('2d');
navigator.mediaDevices.getUserMedia({video: true})
    .then((stream) => {
        webcam.srcObject = stream;
    })
    .catch(function(err) {
        console.log(err.name);
    });

webcam.addEventListener('loadeddata', () => {
  draw();
})

function draw() {
  context.drawImage(webcam, 0, 0, width, height);
  pixels = context.getImageData(0,0,canvas.width,canvas.height);
  if (filter !== "Normal") {
    setPixels(filter, 'wasm');
  }
  context.putImageData(pixels, 0, 0);
  requestAnimationFrame(draw);
}


function addButtons (lang) {
  let filters = ['Normal', 'Grayscale', 'Brighten', 'Invert', 'Noise', 'Sunset', 
                 'Analog TV', 'Emboss', 'Super Edge', 'Super Edge Inv',
                 'Gaussian Blur', 'Sharpen', 'Uber Sharpen', 'Clarity', 'Good Morning', 'Acid', 'Urple', 'Forest', 'Romance', 'Hippo', 'Longhorn', 'Underground', 'Rooster', 'Mist', 'Tingle', 'Bacteria'];
  let buttonDiv = document.createElement('div');
  buttonDiv.id = 'buttons';
  document.body.appendChild(buttonDiv);
  for (let i = 0; i < filters.length; i++) {
    let button = document.createElement('button');
    button.innerText = lang + ' ' + filters[i];
    button.addEventListener('click', () => filter = filters[i]);
    buttonDiv.appendChild(button);
  }
}


function setPixels (filter, language) {
  if (language === 'wasm') {
    let kernel, divisor;
    switch (filter) {
      case 'Grayscale': pixels.data.set(wam.grayScale(pixels.data)); break;
      case 'Brighten': pixels.data.set(wam.brighten(pixels.data)); break;
      case 'Invert': pixels.data.set(wam.invert(pixels.data)); break;
      case 'Noise': pixels.data.set(wam.noise(pixels.data)); break;
      case 'Sunset': pixels.data.set(wam.sunset(pixels.data, cw)); break;
      case 'Analog TV': pixels.data.set(wam.analogTV(pixels.data, cw)); break;
      case 'Emboss': pixels.data.set(wam.emboss(pixels.data, cw)); break;
      case 'Super Edge': pixels.data.set(wam.sobelFilter(pixels.data, cw, ch)); break;
      case 'Super Edge Inv': pixels.data.set(wam.sobelFilter(pixels.data, cw, ch, true)); break;
      case 'Gaussian Blur': pixels.data.set(wam.blur(pixels.data, cw, ch)); break;
      case 'Sharpen': pixels.data.set(wam.sharpen(pixels.data, cw, ch)); break;      
      case 'Uber Sharpen': pixels.data.set(wam.strongSharpen(pixels.data, cw, ch));
      break;
      case 'Clarity': pixels.data.set(wam.clarity(pixels.data, cw, ch)); break;
      case 'Good Morning': pixels.data.set(wam.goodMorning(pixels.data, cw, ch)); break;
      case 'Acid': pixels.data.set(wam.acid(pixels.data, cw, ch)); break;
      case 'Urple': pixels.data.set(wam.urple(pixels.data, cw)); break;
      case 'Forest': pixels.data.set(wam.forest(pixels.data, cw)); break;
      case 'Romance': pixels.data.set(wam.romance(pixels.data, cw)); break;
      case 'Hippo': pixels.data.set(wam.hippo(pixels.data, cw)); break;
      case 'Longhorn': pixels.data.set(wam.longhorn(pixels.data, cw)); break;
      case 'Underground': pixels.data.set(wam.underground(pixels.data, cw)); break;
      case 'Rooster': pixels.data.set(wam.rooster(pixels.data, cw)); break;
      case 'Mist': pixels.data.set(wam.mist(pixels.data, cw)); break;
      case 'Tingle': pixels.data.set(wam.tingle(pixels.data, cw)); break;
      case 'Bacteria': pixels.data.set(wam.bacteria(pixels.data, cw)); break;     
    }
  }
}