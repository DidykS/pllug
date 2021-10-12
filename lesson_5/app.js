/* Part 1: */

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
// Цей приклад спрацює для усіх дочірніх елементів батьківського елементу 'animals'
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

// Приклад який спрацює для всіх елементів з класом 'dangerous' на сторінці
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

/* Part 2: */

/* Task 1 */
function createLsstLi() {
  const birds = document.querySelector('#birds');
  const newLi = document.createElement('li');
  newLi.classList.add('wild', 'dangerous');
  newLi.innerText = 'Hawk';
  birds.append(newLi);
}

createLsstLi();

//одрукувався, припускаю, що мало бути createLаstLi

/* Task 2 */
function newUl() {
  const birds = document.querySelector('#birds');

  const fish = document.createElement('ul');
  const shark = document.createElement('li');

  shark.innerText = 'Shark';

  fish.id = 'fish';
  shark.classList.add('dangerous');

  birds.before(fish);
  fish.append(shark);
}

newUl();

// логічніше було б спочатку додати в fish елемент shark, а потім вже додавати список fish на сторінку імхо
// не є помилкою, якщо раптом що

/* Task 3 */
function reverseElements() {
  const animals = document.querySelector('#animals');
  const children = animals.querySelectorAll('li');
  Array.from(children)
    .reverse()
    .forEach((item) => animals.append(item));
}

reverseElements();

/* Task 4 */

function changeClassToDataAttribute() {
  const animals = document.querySelector('#animals').children;
  for (const item of animals) {
    item.classList.forEach((classOfElement) => {
      item.dataset[classOfElement] = "";
      // Спосіб 2:
      // item.setAttribute(`data-${classOfElement}`, '');
    });
    item.removeAttribute('class');
  }
}
changeClassToDataAttribute();

// Щоб підкрасити всі нові елементи з класом dangerous червоним потрібно функцію changeColor2 викликати тут.


// Все гуд, по п'ятому таску серйозних зауважень нема
