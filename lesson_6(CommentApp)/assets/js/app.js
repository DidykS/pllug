const form = document.querySelector('#form');
const nickName = document.querySelector('#form__nickname');
const name = document.querySelector('#form__name');
const area = document.querySelector('#form__area');
const btn = document.querySelector('#btn');
const inputs = document.querySelectorAll('input');

const comments = document.querySelector('#comments');

// only english words and numbers
inputs.forEach((item) => {
  item.addEventListener('keyup', (e) => {
    item.value = item.value.replace(/[А-Яа-я]/g, '');
  });
});

// check for blank fields
form.addEventListener(`input`, (e) => {
  if (nickName.value.trim() && name.value.trim() && area.value.trim()) {
    btn.style.display = 'block';
  } else {
    btn.style.display = 'none';
  }

  clear();
});

// create array with future comments
const commentsArr = [];

// event for saving comment
btn.addEventListener('click', (e) => {
  // create object as a comment
  let comment = {};
  // check nickName
  if (nickName.value.trim().length <= 1) {
    setError(nickName, 'err');
  } else {
    setSuccess(nickName, 'succes');
    comment.nickName = nickName.value.trim();
  }

  // check name
  if (name.value.trim().length <= 1) {
    setError(name, 'err');
  } else {
    setSuccess(name, 'succes');
    comment.name = name.value.trim();
  }

  // check area
  if (area.value.trim().length <= 1) {
    setError(area, 'err');
  } else {
    setSuccess(area, 'succes');
    comment.content = area.value.trim();
  }

  // adding a new comment
  commentsArr.push(comment);

  // clearing fields
  nickName.value = '';
  name.value = '';
  area.value = '';

  // show comments
  showComment();
});

// show comments
function showComment() {
  const newComment = document.createElement('div');
  commentsArr.forEach((item, idx) => {
    newComment.classList = 'comment';
    newComment.innerHTML = `<div class="comment__header">
        <span>${item.nickName}</span> - <span>${item.name}</span>
      </div>
      <p class="comment__content">
        ${item.content}
      </p>
      <button id="${idx}" class="delete">delete</button>`;
  });
  comments.prepend(newComment);
}

// delete comment
comments.addEventListener('click', (e) => {
  if (e.target.classList == 'delete') {
    e.target.parentNode.remove();
    deleteComment(e.target.id);
  } else {
    return false;
  }
});

showComment();

// setError
function setError(input, message) {
  const formGroup = input;
  console.log(message);
  formGroup.classList.add('error');
}

// setSuccess
function setSuccess(input, message) {
  const formGroup = input;
  console.log(message);
  formGroup.classList.add('success');
}

// clear function
function clear() {
  const clears = document.querySelectorAll('.clear');

  clears.forEach((item) => {
    item.classList.remove('success');
  });
}

// deleteComment function
function deleteComment(idx) {
  commentsArr.splice(idx, 1);
}
