const form = document.querySelector('#form');
const inputs = document.querySelectorAll('.inputAndArea');
const nickName = document.querySelector('#form__nickname');
const $name = document.querySelector('.form__control-name'); //вибивається по неймінгу з усіх інших змінних
const area = document.querySelector('#form__area');
const btn = document.querySelector('#btn');
const comments = document.querySelector('#comments');

// create array with future comments
const commentsArr = [];

// check nickName
nickName.addEventListener('input', () => {
  nickName.value = nickName.value.replace(/[^A-Za-z0-9]/gi, '');
  const target = nickName.value.trim();

  // ліпше порефакторити весь блок if-else. У тебе тут 3 рази підряд юзається функція setSuccess()
  // Можна просто замінити на щось типу цього, щоб ліпше читалося

  // if (isNotEmptyField(target) && isValidLength(target, 'nickName') && isValidCharacter(target)) {
  //   setSuccess(nickName);
  // } else {
  //   if (!isValidCharacter(target)) setError(nickName, 'Must be at least one letter');
  //   if (!isValidLength(target)) setError(nickName, 'Need minimum 3 characters');
  //   if (!isEmptyField(target)) setError(nickName, 'Field cannot be empty');
  // }

  // і в наступних функціях так само варто порефакторити

  // My first decision:
  /* if (isNotEmptyField(target)) {
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
  } */

  // Refactor:
  if (
    isNotEmptyField(target) &&
    isValidLength(target, 'nickName') &&
    isValidCharacter(target)
  ) {
    setSuccess(nickName);
  } else {
    if (!isValidCharacter(target))
      setError(nickName, 'Must be at least one letter');
    if (!isValidLength(target, 'nickName'))
      setError(nickName, 'Need minimum 3 characters');
    if (!isNotEmptyField(target)) setError(nickName, 'Field cannot be empty');
  }
});

// check $name
$name.addEventListener('input', (e) => {
  $name.value = $name.value.replace(/[^A-Za-z]/gi, '');
  const target = $name.value.trim();

  // My first decision:
  /* if (isEmptyField(target)) {
    setSuccess($name);

    if (isValidLength(target, '$name')) {
      setSuccess($name);
    } else {
      setError($name, 'Maximum 100 characters');
    }
  } else {
    setError($name, 'Field cannot be empty');
  } */

  // Refactor:
  if (isNotEmptyField(target) && isValidLength(target, '$name')) {
    setSuccess($name);
  } else {
    if (!isValidLength(target, '$name'))
      setError($name, 'Maximum 100 characters');
    if (!isNotEmptyField(target)) setError($name, 'Field cannot be empty');
  }
});

// check textarea
area.addEventListener('input', (e) => {
  const target = area.value.trim();
  area.value = area.value.replace(/[^A-Za-z.,!?-\s]/gi, '');

  // My first decision:
  /* if (isNotEmptyField(target)) {
    setSuccess(area);

    if (isValidLength(target, 'area')) {
      setSuccess(area);
    } else {
      setError(area, 'Maximum 1000 characters');
    }
  } else {
    setError(area, 'Field cannot be empty');
  } */

  // Refactor:
  if (isNotEmptyField(target) && isValidLength(target, 'area')) {
    setSuccess(area);
  } else {
    if (!isValidLength(target, 'area'))
      setError(area, 'Maximum 1000 characters');
    if (!isNotEmptyField(target)) setError(area, 'Field cannot be empty');
  }
});

// check for blank fields
form.addEventListener(`input`, (e) => {
  if (isValidFields()) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }
});

// add comment
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
  createNotificationForAdd();
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
  createNotificationForDelete();
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

// isNotEmptyField function
function isNotEmptyField(target) {
  if (target.length === 0) {
    return false;
  }

  return true;
}

// Трохи помилка в логіці. Назва isEmptyField вказує на те, що функція повертатиме true
// саме коли поле пусте. Натомість, в цьому випадку вона повертає false. Ліпше або виправити логіку
// всередині неї, або ж перейментувати на щось типу isNotEmptyField
// крім того, весь код можна замінити функцією типу наступної

/* function isEmptyFieldExample1(target) {
  return target.length === 0;
} */

//або ж взагалі так:
/* const isEmptyFieldExample2 = (target) => target.length === 0; */

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
// My first decision
/* function isValidFields() {
  if (
    nickName.parentNode.classList.contains('success') &&
    $name.parentNode.classList.contains('success') &&
    area.parentNode.classList.contains('success')
  ) {
    return true;
  }
  return false;
} */

// Refactor:
function isValidFields() {
  return (
    nickName.parentNode.classList.contains('success') &&
    $name.parentNode.classList.contains('success') &&
    area.parentNode.classList.contains('success')
  );
}

// можна просто замінити на функцію

/* function isValidFieldsExample() {
  return (
    nickName.parentNode.classList.contains('success') &&
    $name.parentNode.classList.contains('success') &&
    area.parentNode.classList.contains('success')
  );
} */

// add comment notification
function createNotificationForAdd() {
  //не варто скорочувати назви змінних, ліпше буде повністю написати notification
  const notif = document.createElement('div');
  notif.innerHTML += '<span>Comment was added</span>';
  notif.classList.add('notification');

  document.querySelector('body').appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 1500);
}

// delete comment notification
function createNotificationForDelete() {
  const notif = document.createElement('div');
  notif.innerHTML += '<span>Comment was deleted</span>';
  notif.classList.add('notification');
  notif.style.color = '#e53935';

  document.querySelector('body').appendChild(notif);

  setTimeout(() => {
    notif.remove();
  }, 1500);
}
// взагалі незрозуміла назва функції
