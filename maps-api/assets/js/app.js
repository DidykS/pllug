const wrapper = document.querySelector('.wrapper');
const showOptions = document.querySelector('.wrapper__btn');

const select = document.querySelector('#select');

const range = document.querySelector('.range');
const output = document.querySelector('.app__options--range--output');

const sendBtn = document.querySelector('.app__options--btn');

// get current position
let latitude = document.getElementById('latitude').value;
let longitude = document.getElementById('longitude').value;

// show options block event
showOptions.addEventListener('click', () => {
  wrapper.classList.toggle('active');
});

// show range to html
function rangeToHtml() {
  output.innerHTML = range.value;
  range.addEventListener('input', () => {
    output.innerHTML = range.value;
  });
}

// show map
sendBtn.addEventListener('click', () => {
  const description = document.querySelector('.description');
  description.style.display = 'none';
  setData();
});

// Functions:
// set data function
function setData() {
  const rates = document.getElementsByName('rate');

  let value;

  for (let i = 0; i < rates.length; i++) {
    if (rates[i].checked) {
      value = rates[i].value;
    }
  }

  const url =
    value === 'map'
      ? 'http://198.199.125.240:8888/search'
      : 'http://198.199.125.240:8888/csv';

  let object = {
    query: select.options[select.selectedIndex].value,
    radius: range.value,
    lat: latitude,
    lng: longitude,
  };

  getData(url, object, value);
}

// get data function
async function getData(url, object, value) {
  let response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify(object),
  });

  if (value === 'map') {
    const data = await response.json();
    initMap(data);
  } else {
    const data = await response.text();
    downloadCSV(data);
  }
}

// initialize map
function initMap(data) {
  const element = document.querySelector('.map');

  const options = {
    zoom: 10,
    center: { lat: latitude, lng: longitude },
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER,
    },
    mapTypeControl: true,
    mapTypeControlOptions: {
      style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
      position: google.maps.ControlPosition.LEFT_CENTER,
    },
    streetViewControl: true,
    streetViewControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER,
    },

    zoomControl: true,
    zoomControlOptions: {
      position: google.maps.ControlPosition.RIGHT_CENTER,
    },
  };

  const myMap = new google.maps.Map(element, options);

  setMyPositionMarker(myMap);
  getMarkers(data, myMap);
}

// set my position on the map
function setMyPositionMarker(map) {
  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `<h1>My position</h1>`,
  });

  infoWindow.open(map, marker);
}

// get positions from data
function getMarkers(data, map) {
  data.forEach((item) => {
    const marker = new google.maps.Marker({
      position: { lat: item.lat, lng: item.lng },
      map: map,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: `<h1>${item.name}</h1>
      <span>${item.lat}, ${item.lng}</spam>
      `,
    });

    marker.addListener('click', () => {
      infoWindow.open(map, marker);
    });
  });
}

// download csv file
function downloadCSV(csvStr) {
  const hiddenElement = document.createElement('a');
  hiddenElement.href = 'data:text/csv;charset=utf-8,' + csvStr;
  hiddenElement.download = 'output.csv';
  hiddenElement.click();
}

// check geolocation function
function checkLocation() {
  if (navigator.geolocation) {
    console.log('Geolocation is supported!');
    navigator.geolocation.getCurrentPosition(geoSuccess);
  } else {
    console.log(
      'Geolocation is not supported for this Browser/OS version yet.'
    );
  }
}

function geoSuccess(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
}

checkLocation();
rangeToHtml();
