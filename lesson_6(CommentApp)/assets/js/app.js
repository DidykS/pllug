const form = document.querySelector('#form');
const inputs = document.querySelectorAll('.inputAndArea');
const nickName = document.querySelector('#form__nickname');
const $name = document.querySelector('.form__control-name');
const area = document.querySelector('#form__area');
const btn = document.querySelector('#btn');
const comments = document.querySelector('#comments');

// create array with future comments
const commentsArr = [];

// only english words and numbers
inputs.forEach((item) => {
  item.addEventListener('keyup', (e) => {
    item.value = item.value.replace(/[А-Яа-я]/g, '');
  });
});

// check for blank fields
form.addEventListener(`input`, (e) => {
  if (isValidFields()) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
});

// check nickName
nickName.addEventListener('input', (e) => {
  const target = nickName.value.trim();

  if (isEmptyField(target)) {
    setSuccess(nickName);

    if (isValidLength(target, 'nickName')) {
      setSuccess(nickName);
      if (isValidCharacter(target)) {
        setSuccess(nickName);
      } else {
        setError(nickName, 'Must be at least one letter');
      }
    } else {
      setError(nickName, 'Need minimum 3 characters');
    }
  } else {
    setError(nickName, 'Field cannot be empty');
  }
});

// check $name
$name.addEventListener('input', (e) => {
  const target = $name.value.trim();

  if (isEmptyField(target)) {
    setSuccess($name);

    if (isValidLength(target, '$name')) {
      setSuccess($name);
    } else {
      setError($name, 'Maximum 100 characters');
    }
  } else {
    setError($name, 'Field cannot be empty');
  }
});

area.addEventListener('input', (e) => {
  const target = area.value.trim();
  if (isEmptyField(target)) {
    setSuccess(area);

    if (isValidLength(target, 'area')) {
      setSuccess(area);
    } else {
      setError(area, 'Maximum 1000 characters');
    }
  } else {
    setError(area, 'Field cannot be empty');
  }
});

// event for saving comment
btn.addEventListener('click', (e) => {
  let comment = {
    nickName: nickName.value.trim(),
    name: $name.value.trim(),
    content: area.value.trim(),
  };

  // adding a new comment
  commentsArr.push(comment);

  // clearing fields
  nickName.value = '';
  $name.value = '';
  area.value = '';

  btn.style.display = 'none';

  // show comments
  showComment();
  // create notification
  createNotifeAdd();
  // clean fields
  clear();
});

// show comments
function showComment() {
  const newComment = document.createElement('div');
  commentsArr.forEach((item, idx) => {
    newComment.classList = 'comment';
    newComment.innerHTML = `
    <div class="comment__header">
      <div class="comment__header-info">
        <span>${item.nickName}</span> - <span>${item.name}</span>
      </div>
      <div class="comment__header-date">${new Date().toLocaleString()}</div>
    </div>
    <p class="comment__content">
    ${item.content}
    </p>
    <button id="${idx}" class="btn danger comment__delete">
      Delete comment
    </button>
    `;
  });
  comments.prepend(newComment);
}

// delete comment
comments.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.parentNode.remove();
    deleteComment(e.target.id);
  }
});

// deleteComment function
function deleteComment(idx) {
  commentsArr.splice(idx, 1);
  createNotifeDel();
}

// setError
function setError(input, message) {
  const formGroup = input.parentNode;
  const small = formGroup.querySelector('.error__text');

  small.innerText = message;

  formGroup.classList.remove('success');
  formGroup.classList.add('error');
}

// setSuccess
function setSuccess(input, message) {
  const formGroup = input.parentNode;

  formGroup.classList.remove('error');
  formGroup.classList.add('success');
}

// clear function
function clear() {
  const clears = document.querySelectorAll('.form__group');

  clears.forEach((item) => {
    item.classList.remove('success');
  });
}

// isEmptyField function
function isEmptyField(target) {
  if (target.length === 0) {
    return false;
  }

  return true;
}

// isValidLength function
function isValidLength(target, value) {
  if (value === 'nickName') {
    if (target.length >= 3 && target.length <= 24) {
      return true;
    }
  }

  if (value === '$name') {
    if (target.length >= 1 && target.length <= 100) {
      return true;
    }
  }

  if (value === 'area') {
    if (target.length >= 1 && target.length <= 1000) {
      return true;
    }
  }

  return false;
}

// isValidCharacters function
function isValidCharacter(target) {
  const regex = /[a-zA-Z]/;

  if (regex.test(target)) {
    return true;
  }

  return false;
}

// isValidFields function
function isValidFields() {
  if (
    nickName.parentNode.classList.contains('success') &&
    $name.parentNode.classList.contains('success') &&
    area.parentNode.classList.contains('success')
  ) {
    return true;
  }
  return false;
}

// add comment notification
function createNotifeAdd() {
  const notif = document.createElement('div');
  notif.innerHTML += '<span>Comment was added</span>';
  notif.classList.add('notification');

  document.querySelector('body').appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 1500);
}

// delete comment notification
function createNotifeDel() {
  const notif = document.createElement('div');
  notif.innerHTML += '<span>Comment was deleted</span>';
  notif.classList.add('notification');
  notif.style.color = '#e53935';

  document.querySelector('body').appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 1500);
}
