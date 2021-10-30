const btn = document.querySelector('.btn');
const input = document.querySelector('#input');
const card = document.querySelector('.card');
const preview = document.querySelector('.preview');

const events = ['dragenter', 'dragover', 'dragleave', 'drop'];
let inputFiles = [];

btn.addEventListener('click', () => {
  input.click();
});

events.forEach((eventName) => {
  card.addEventListener(eventName, (e) => {
    e.preventDefault();
    e.stopPropagation();
  });
});

card.addEventListener('dragenter', () => {
  card.classList.add('active');
  card.querySelector('.card__icon').style.animation =
    'animate 0.6s infinite alternate-reverse';
});

card.addEventListener('dragover', () => {
  card.classList.add('active');
  card.querySelector('.card__icon').style.animation =
    'animate 0.6s infinite alternate-reverse';
});

card.addEventListener('dragleave', () => {
  card.classList.remove('active');
  card.querySelector('.card__icon').style.animation = '';
});

// add file by drop
card.addEventListener('drop', (e) => {
  card.classList.remove('active');
  card.querySelector('.card__icon').style.animation = '';
  preview.style.padding = '5px';
  const files = [...e.dataTransfer.files];

  files.forEach(displayImage);

  sizeLimit(files);
});

// add file by button
input.addEventListener('change', (e) => {
  preview.style.padding = '5px';
  const files = [...e.target.files];
  files.forEach(displayImage);

  sizeLimit(files);
});

// display file
function displayImage(file, idx) {
  let url = URL.createObjectURL(file);
  let item = document.createElement('div');
  item.classList.add('item');

  if (file.type == 'text/plain') {
    item.innerHTML = `
    <div class="item__info">
      <img class="item__info--img" src="./images/txt.png" alt="${file.name}" />
      <span class="item__info--name">${file.name}</span>
      <span class="item__info--size">${bytesToSize(file.size)}</span>
      <button id="${idx}" class="btn primary">Delete</button>
    </div>
  `;
  } else if (file.type == 'text/csv') {
    item.innerHTML = `
    <div class="item__info">
      <img class="item__info--img" src="./images/csv.png" alt="${file.name}" />
      <span class="item__info--name">${file.name}</span>
      <span class="item__info--size">${bytesToSize(file.size)}</span>
      <button id="${idx}" class="btn primary">Delete</button>
    </div>
  `;
  } else {
    item.innerHTML = `
    <div class="item__info">
      <img class="item__info--img" src="${url}" alt="${file.name}" />
      <span class="item__info--name">${file.name}</span>
      <span class="item__info--size">${bytesToSize(file.size)}</span>
      <button id="${idx}" class="btn primary">Delete</button>
    </div>
  `;
  }

  inputFiles.push(file);
  preview.append(item);

  lengthLimit();
}

// Delete file from preview
preview.addEventListener('click', (e) => {
  if (e.target.tagName !== 'BUTTON') {
    return;
  }

  e.target.parentNode.parentNode.remove();
  preview.style.padding = 0;

  deleteFile(e.target.id, 1);
});

// Functions:
// delete file
function deleteFile(idx) {
  inputFiles.splice(idx, 1);
}

// sortable list
new Sortable(preview, {
  animation: 350,
});

// check length of files
function lengthLimit() {
  if (preview.children.length > 10) {
    inputFiles = [];
    preview.innerHTML = '';
    preview.style.padding = 0;
    warning('Files must be less that 10');
  }
}

// check size of file
function sizeLimit(files) {
  files.forEach((item) => {
    if (item.size > 2097152) {
      inputFiles = [];
      preview.innerHTML = '';
      preview.style.padding = 0;
      warning('This file must be less than 2MB.');
    }
  });
}

// Bites to size
function bytesToSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (!bytes) return '0 Byte';
  const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
}

// create warning
function warning(text) {
  const warning = document.querySelector('.warning');
  warning.innerHTML = text;
  warning.style.opacity = '1';

  setTimeout(() => {
    warning.style.opacity = '0';
    warning.innerHTML = '';
  }, 3000);
}
