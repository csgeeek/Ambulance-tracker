const socket = io('http://localhost:3000');

let sender = '';
socket.on('connect', () => {
    console.log("socket connected");
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    const banner = document.querySelector('.my-banner');
    sender = socket.id;
    banner.textContent = `Hello ${socket.id}`;
});
socket.on('send-message', (data) => {
    // console.log(data);
    const parsedData = JSON.parse(data);
    const ul = document.querySelector('.my-list');
    const li = document.createElement('li');
    li.textContent = `Sender- ${parsedData.sender}  Reciever- ${parsedData.reciever} lat: ${parsedData.lat} lon: ${parsedData.lon}`;
    ul.appendChild(li);
});

const btn = document.querySelector('.btn');
let reciever = '';
btn.addEventListener('click', (e) => {
    
    e.preventDefault();

    // const txt = document.querySelector('.txt-field');
    const sendTo = document.querySelector('.uid');
    reciever = sendTo.value;
    
    if(reciever === '') {
        alert('Please enter a message');
        return;
    }
    document.querySelector('.display-id').textContent = `Sending to ${reciever}!`;

    sendTo.value = '';
});


var id, target, options;

let tlat = 17.743872, tlon = 83.2897024, uniqid = '';


function success(pos) {
  var crd = pos.coords;
    // console.log(`latitude = ${crd.latitude} ---- longitude = ${crd.longitude}`);
  document.querySelector('#status').textContent = `Your location is being tracked`;
  // console.log(`${ getDistanceFromLatLonInKm(crd.latitude, crd.longitude, 0, 0) }`);
  // const ans = getDistanceFromLatLonInKm(crd.latitude, crd.longitude, tlat, tlon);
  // document.querySelector('#dist').textContent = `Distance between current loc and ${ tlat }, ${ tlon } is ${ ans }`;
  const data = {
    sender: sender,
    reciever: reciever,
    lat: crd.latitude,
    lon: crd.longitude
  }


  socket.emit('send-coords', JSON.stringify(data));
  
  // https://test-geoloc-api.herokuapp.com/api/v/coord
  // http://localhost:8080/api/v/coord
  // postData('https:lo', data)
  // .then(data => {
  //   console.log(data); // JSON data parsed by `data.json()` call
  // });
  // if(ans < 5){
  //   document.querySelector('.range').textContent = `within 5 km range`;
  // }else{
  //   document.querySelector('.range').textContent = `not in 5km range`;
  // }
  if (target.latitude === crd.latitude && target.longitude === crd.longitude) {
    console.log('Congratulations, you reached the target');
    navigator.geolocation.clearWatch(id);
  }
}

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
}

target = {
  latitude : 0,
  longitude: 0
};

options = {
  enableHighAccuracy: true,
  timeout: 1000
};

id = navigator.geolocation.watchPosition(success, error, options);
// console.log(id);

//   document.querySelector('#find-me').addEventListener('click', geoFindMe);
  