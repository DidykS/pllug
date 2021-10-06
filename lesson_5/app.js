/* Task 1 */
function changeFontSize() {
  const animals = document.querySelector('#animals');
  animals.style.fontSize = '25px';
}

changeFontSize();

/* Task 2 */
function removeClass() {
  const animals = document.querySelector('#animals');
  const last = animals.lastElementChild;
  last.classList = '';
}

// removeClass()

/* Task 3 */

function changeBg() {
  const cat = document.querySelector('#cat');
  const nextElement = cat.nextElementSibling;
  nextElement.style.backgroundColor = 'red';
}

changeBg();

/* Task 4 */
function changeColor() {
  const animals = document.querySelector('#animals');
  const children = animals.children;

  for (const item of children) {
    if (item.classList.contains('dangerous')) {
      item.style.color = 'red';
    }
  }
}

changeColor();

function changeColor2() {
  const all = document.querySelectorAll('.dangerous');
  all.forEach((item) => (item.style.color = 'red'));
}

changeColor2();

/* Task 5 */
function removePet() {
  const allPet = document.querySelectorAll('.pet');
  allPet.forEach((item) => {
    if (item.classList.length === 1) {
      item.remove();
    }
  });
}

removePet();

/* Task 6 */
function createLi() {
  const birds = document.querySelector('#birds');
  const newLi = document.createElement('li');
  newLi.classList.add('wild');
  newLi.innerText = 'Blackbird';
  birds.prepend(newLi);
}

createLi();
