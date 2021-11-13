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
  output.innerHTML = range.value + ' meters.';
  range.addEventListener('input', () => {
    output.innerHTML = range.value + ' meters.';
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
    initMap(data, object.query);
  } else {
    const data = await response.text();
    downloadCSV(data);
  }
}

// initialize map
function initMap(data, type) {
  const element = document.querySelector('.map');

  const iconMarker = checkTypePlace(type);

  const main_color = '#007148',
    saturation_value = -1,
    brightness_value = 1;

  const style = [
    {
      elementType: 'labels',
      stylers: [{ saturation: saturation_value }],
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road.highway',
      elementType: 'labels',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road.local',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'road.arterial',
      elementType: 'labels.icon',
      stylers: [{ visibility: 'on' }],
    },
    {
      featureType: 'road',
      elementType: 'geometry.stroke',
      stylers: [{ visibility: 'off' }],
    },
    {
      featureType: 'transit',
      elementType: 'geometry.fill',
      stylers: [
        { hue: main_color },
        { visibility: 'on' },
        { lightness: brightness_value },
        { saturation: saturation_value },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'geometry.fill',
      stylers: [
        { hue: main_color },
        { visibility: 'on' },
        { lightness: brightness_value },
        { saturation: saturation_value },
      ],
    },
    {
      featureType: 'poi.government',
      elementType: 'geometry.fill',
      stylers: [
        { hue: main_color },
        { visibility: 'on' },
        { lightness: brightness_value },
        { saturation: saturation_value },
      ],
    },
    {
      featureType: 'poi.attraction',
      elementType: 'geometry.fill',
      stylers: [
        { hue: main_color },
        { visibility: 'on' },
        { lightness: brightness_value },
        { saturation: saturation_value },
      ],
    },
    {
      featureType: 'poi.business',
      elementType: 'geometry.fill',
      stylers: [
        { hue: main_color },
        { visibility: 'on' },
        { lightness: brightness_value },
        { saturation: saturation_value },
      ],
    },
    {
      featureType: 'transit',
      elementType: 'geometry.fill',
      stylers: [
        { hue: main_color },
        { visibility: 'on' },
        { lightness: brightness_value },
        { saturation: saturation_value },
      ],
    },
    {
      featureType: 'transit.station',
      elementType: 'geometry.fill',
      stylers: [
        { hue: main_color },
        { visibility: 'on' },
        { lightness: brightness_value },
        { saturation: saturation_value },
      ],
    },
    {
      featureType: 'landscape',
      stylers: [
        { hue: main_color },
        { visibility: 'on' },
        { lightness: brightness_value },
        { saturation: saturation_value },
      ],
    },
    {
      featureType: 'road',
      elementType: 'geometry.fill',
      stylers: [
        { hue: main_color },
        { visibility: 'on' },
        { lightness: brightness_value },
        { saturation: saturation_value },
      ],
    },
    {
      featureType: 'road.highway',
      elementType: 'geometry.fill',
      stylers: [
        { hue: main_color },
        { visibility: 'on' },
        { lightness: brightness_value },
        { saturation: saturation_value },
      ],
    },
    {
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        { hue: main_color },
        { visibility: 'on' },
        { lightness: brightness_value },
        { saturation: saturation_value },
      ],
    },
  ];

  const options = {
    zoom: 14,
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
    styles: style,
  };

  const myMap = new google.maps.Map(element, options);

  setMyPositionMarker(myMap);
  getMarkers(data, myMap, iconMarker);
}

// set my position on the map
function setMyPositionMarker(map) {
  const myPosMarker = './assets/icons/male.png';

  const content = `
      <div class="info-window__container">
        <div class="info-window__container--title">You are here</div>
      </div>
      `;

  const marker = new google.maps.Marker({
    position: { lat: latitude, lng: longitude },
    map: map,
    icon: myPosMarker,
  });

  const infoWindow = new google.maps.InfoWindow({
    content: content,
  });

  infoWindow.open(map, marker);
  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });
}

// get positions from data
function getMarkers(data, map, iconMarker) {
  data.forEach((item) => {
    const content = `
      <div class="info-window__container">
        <div class="info-window__container--title">${item.name}</div>
        <div class="info-window__container--content">
          <div class="info-window__container--subTitle">"${item.address}"</div>
        </div>
      </div>
      `;

    const marker = new google.maps.Marker({
      position: { lat: item.lat, lng: item.lng },
      map: map,
      icon: iconMarker,
    });

    const infoWindow = new google.maps.InfoWindow({
      content: content,
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

// check type of place function
function checkTypePlace(query) {
  const icons = {
    restaurant: './assets/icons/restaurant.png',
    museum: './assets/icons/museum.png',
    hotel: './assets/icons/lodging.png',
    coffee: './assets/icons/cafe.png',
    McDonalds: './assets/icons/food.png',
  };
  return icons[query];
}

checkLocation();
rangeToHtml();
