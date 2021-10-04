// Part 1:
/* Task 1 */

/* 
  Метод map:
  Він викликає функцію для кожного елемента масиву і повертає масив результатів виконання цієї функції

  Метод filter:
  Метод шукає елемент, на якому функція-колбек поверне true 

  Метод reduce:
  Використовуються для обчислення якогось єдиного значення на основі всього масиву.

  Метод join:
  Метод об'єднує елементи масиву в рядок із зазначеним роздільником (він буде вставлений між елементами масиву)

  Метод flat:
  Метод дістає вкладені масиви і переносить їх на рівень, який визначає розробник. Дефолтний рівень - 1.

  Метод flatMap:
  Метод дістає вкладені масиви і переносить і виконує функцію map для масиву
*/

/* Task 2 */
/* 
  Метод Object.keys:
  Метод повертає масив з ключами(властивостяи обєкту) у вигляді ['ключ', 'ключ']

  Метод Object.values:
  Метод повертає масив з значеннями обєкту у вигляді ['значення', 'значення']

  Метод Object.entries:
  Метод повертає масив з ключами і значеннями обєкту у вигляді [['ключ', 'значення'], ['ключ', 'значення']]
*/

/* Task 3 */
// Метод split - розділяє рядок на символи і розміщає їх в масиві

/* Task 4 */
function toCamelCase(arr) {
  const filteredArr = arr.filter((item) => typeof item === 'string')
  let resultStr = ''

  for (let i = 0; i < filteredArr.length; i++) {
    let current = filteredArr[i].toLowerCase()

    resultStr += title(current)
  }

  return lower(resultStr)
}

console.log(
  toCamelCase([
    1,
    2,
    3,
    null,
    undefined,
    'To',
    [1, 2],
    'CaMel',
    { name: 34 },
    'caSe',
  ])
) // toCamelCase

function title(str) {
  return str[0].toUpperCase() + str.slice(1)
}

function lower(str) {
  return str[0].toLowerCase() + str.slice(1)
}

/* Task 5 */
const aplhabet = 'abcdefghijklmnopqrstuvwxyz'

function aplhabetC(arr) {
  const newArr = []

  for (let i = 0; i < arr.length; i++) {
    newArr.push(aplhabet[arr[i] - 1])
  }

  return newArr
}

console.log(aplhabetC([4, 3, 22, 11])) // ['d', 'c', 'v', 'k']

// З використанням методу map
function aplhabet2(arr) {
  return arr.map((item) => (item = aplhabet[item - 1]))
}

console.log(aplhabet2([4, 3, 22, 11])) // ['d', 'c', 'v', 'k']

/* Task 6 */
function filterObject(object) {
  const resultObject = {}

  for (const key in object) {
    if (object[key] >= 0) {
      resultObject[key] = object[key]
    }
  }

  return resultObject
}

console.log(filterObject({ a: 22, b: -11.35, c: 41.2, d: 'hello' })) // {a: 22, c: 41.2}

// =============================== Задачі з зірочкою ============================== //
// 1:
function stringSum(array) {
  return array
    .map((item) => item.replace(/[^a-zA-Z]+/g, '').length)
    .reduce((acc, elem) => acc + elem)
}

console.log(stringSum(['hello!', 'привіт', 'world!!!!34,:', 'світ'])) // 10

// 2:
function fromArray(array) {
  return Object.fromEntries(array)
}

console.log(
  fromArray([
    ['a', 'hello'],
    ['b', 33],
    ['c', 'bye'],
  ])
) // {a: 'hello', b: 33, c: 'bye'}

// 3:
function fromString(str) {
  str = str.split('&')
  str = str
    .map((item) => item.split('='))
    .map((item) => {
      if (!isNaN(item[1])) {
        return [item[0], +item[1]]
      } else {
        return [item[0], item[1]]
      }
    })
  return Object.fromEntries(str)
}

console.log(fromString('a=22&b=33&c=44&d=55&e=111')) // {a: 22, b: 33, c: 44, d: 55, e: 111}
console.log(fromString('a=22&b=33&c=44&d=55&e=111&f=test')) // {a: 22, b: 33, c: 44, d: 55, e: 111, f: 'test'}

// 4:
// Спосіб 1:
function mostFlatItem2(array) {
  while (array.some((item) => Array.isArray(item))) {
    let temp = []
    for (let i = 0; i < array.length; i++) {
      const curr = array[i]
      if (Array.isArray(curr)) {
        temp.push(...curr)
      }
    }
    array = temp
  }
  return array
}
console.log(mostFlatItem2([1, [2, 3], [[4], 5], [[6]]])) // [ 4, 6 ]
console.log(
  mostFlatItem2([1, [2, 3], [[4], 5], [[6]], [[8]], [[99]], [12, [197]]])
) // [4, 6 ,8 ,99]

// Спосіб 2:
function mostFlatItem(array) {
  while (array.some((item) => Array.isArray(item))) {
    array = array.filter((item) => Array.isArray(item)).flat(1)
  }

  return array
}

console.log(mostFlatItem([1, [2, 3], [[4], 5], [[6]]])) // [ 4, 6 ]
console.log(
  mostFlatItem([1, [2, 3], [[4], 5], [[6]], [[8]], [[99]], [12, [197]]])
) // [4, 6 ,8 ,99, 197]

// 5:
// Спосіб 1:
function nestedArr(array) {
  return JSON.stringify(
    array.map((item) => {
      let result = item

      for (let i = 0; i < item; i++) {
        result = [result]
      }
      return result
    })
  )
}

console.log(nestedArr([1, 2, 3, 4])) // [[1],[[2]],[[[3]]],[[[[4]]]]]

// Спосіб 2:
function nestedArr2(array) {
  const resArr = []

  for (let i = 0; i < array.length; i++) {
    resArr.push(nested(array[i]))
  }

  return resArr
}

function nested(item) {
  let n = item

  for (let i = 0; i < item; i++) {
    n = [n]
  }

  return n
}

console.log(JSON.stringify(nestedArr2([1, 2, 3, 4]))) // [[1],[[2]],[[[3]]],[[[[4]]]]]

// 6:
const data2 = {
  a: '21',
  b: 'sensor',
  c: '0.2',
  d: '00,10',
  f: '21,4',
  h: 'test',
}
const fieldsToNumber2 = ['a', 'c']

function stringToNumber2(object, array) {
  const newObject = {}

  for (let key in object) {
    let value = object[key]
    if (array.includes(key)) {
      if (parseFloat(value) == value) {
        newObject[key] = parseFloat(value)
      } else {
        value = value.replace(',', '.')
        newObject[key] = parseFloat(value)
      }
    } else {
      newObject[key] = value
    }
  }
  return newObject
}
console.log(stringToNumber2(data2, fieldsToNumber2)) // {a: 21, b: 'sensor', c: 0.2, d: '00,10', f: '21,4', h: 'test'}

/* Part 2: DOM */
/* Task 1 */
// DOMContentLoaded - коли браузер повністю завантажив сторінку, побудував DOM модель але css і зображення ще не завантажені
// load - коли браузер завантажує повністю HTML сторіку, побудував DOM і також завантажує css і зображення
// beforeunload - при залишинні юзером сторінки, можна запитати його чи він хоче покинути сторінку
// unload - юзер майже покинув сторінку але лишається змога робити деякі дії

/* Task 2 */
// async - якщо підключиити даний атрибут до скрипту то це означає що коли браузер дійде до визначеного скрипта він не буде чекати поки він повністю загрузиться, він почне його загрузку в фоновому режимі і продовжить зчитування файлу далі, це актуально якщо підключати script в тезі head
// defer - він майже робить те саме що і async але якщо присутній другий script, який також є з атрибутом defer то браузер загружає два скірпти по черзі не дивлячись на їхній розмір

/* Task 3 */
document.addEventListener('DOMContentLoaded', (e) => {
  console.log('DOMContentLoaded is loaded:', new Date().toLocaleString())
})

/* Task 4 */
window.addEventListener('load', (e) => {
  console.log('Everything is loaded', new Date().toLocaleString())
})

/* Task 5 */
window.addEventListener('beforeunload', (e) => {
  console.log(new Date().toLocaleString())
})

/* Task 6 */
console.log(navigator.appCodeName + ' - ' + navigator.platform)

/* Task 7 */
window.addEventListener('beforeunload', (e) => {
  return false
})

/* Task 8 */
const date = new Date()

window.addEventListener('beforeunload', (e) => {
  const endPoint = new Date()
  console.log(((endPoint.getTime() - date.getTime()) / 1000).toFixed(0))
})
