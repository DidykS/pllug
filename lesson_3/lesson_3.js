/* Task 1 */
const emptyObject = {}
console.log(emptyObject) // {}

/* Task 2 */
const emptyObjectWithoutPrototype = Object.create(null)
console.log(emptyObjectWithoutPrototype) // {..no properties}

/* Task 3 */
const emptyObject2 = {}
emptyObject2.name = 'Yaroslav'
emptyObject2['age'] = 22

const phone = '+38097***2432'
emptyObject2['phone'] = phone

console.log(emptyObject2) // {name: 'Yaroslav', age: 22, phone: '+38097***2432'}

/* Task 4 */
// Спосіб 1:
const emptyArr1 = []
console.log(emptyArr1) // []
// Спосіб 2:
const emptyArr2 = new Array()
console.log(emptyArr2) // []

/* Task 5 */
// Спосіб 1:
const emptyArr3 = []

emptyArr3.length = 100500
console.log(emptyArr3) // [empty × 100500]
console.log(emptyArr3.length) // 100500
// Спосіб 2:
const emptyArr4 = new Array(100500) // Якщо задати один аргумент, то він передастся як довжина масиву
console.log(emptyArr4) // [empty × 100500]
console.log(emptyArr4.length) // 100500

/* Task 6 */
// Спосіб 1:
const array = [1, 2, 3, 4, 5]
console.log(array) // [1, 2, 3, 4, 5]

const array2 = new Array(1, 2, 3, 4, 5, 6) // Передача аргументів від 2 і більше буде дорівнювати елементам масиву
console.log(array2) // [1, 2, 3, 4, 5, 6]

/* Task 7 */
array.length = 0
console.log(array) // []

array2.length = 0
console.log(array2) // []

/* Task 8 */
// Спосіб 1: метод pop() - видалення елементу з кінця масиву
const array3 = [1, 2, 3, 4, 5]

function methodPop(array) {
  array.pop()
  return array
}
console.log(methodPop(array3)) // [1, 2, 3, 4]

// Спосіб 2: метод shift() - видалення елементу з початку масиву
const array4 = [1, 2, 3, 4, 5]

function methodShift(array) {
  array.shift()
  return array
}
console.log(methodShift(array4)) // [2, 3, 4, 5

// Спосіб 3: метод pop() і shift() на вибір
const array5 = [1, 2, 3, 4, 5]

function popOrShift(array, word) {
  if (word === 'pop') {
    array.pop()
    return array
  } else if (word === 'shift') {
    array.shift()
    return array
  } else {
    return 'Only pop or shift please'
  }
}

console.log(popOrShift(array5, 'pop')) // [1, 2, 3, 4]
console.log(popOrShift(array5, 'shift')) // [2, 3, 4]
console.log(popOrShift(array5, 'test')) // Only pop or shift please

// Спосіб 4: видалення елементу по індексу
// Функція видаляє тільки одне входження
const array6 = [1, 2, 3, 4, 5]

const deleteElem1 = (array, index) => {
  const target = array.indexOf(index)

  if (target !== -1) {
    array.splice(target, 1)
  }

  return array
}

console.log(deleteElem1(array6, 3)) // [1, 2, 4, 5]

// Спосіб 5: видалення елементу по індексу
// Функція видаляє всі входження
const array7 = [1, 2, 3, 4, 5, 4]

const deleteElem2 = (array, index) => {
  const resultArr = []

  for (let i = 0; i < array.length; i++) {
    if (array[i] !== index) {
      resultArr.push(array[i])
    }
  }

  return resultArr
}

console.log(deleteElem2(array7, 4)) // [1, 2, 3, 5]

// Спосіб 6: видалення елементу по індексу
// Функція видаляє всі входження
const array8 = [1, 2, 3, 4, 5, 4, 2]

const deleteElem3 = (array, index) => {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === index) {
      array.splice(i, 1)
    }
  }

  return array
}

console.log(deleteElem3(array8, 2)) // [1, 3, 4, 5, 4]

// Спосіб 6: видалення елементу по індексу, метод filter()
// Функція видаляє всі входження
const array9 = [1, 2, 3, 4, 5, 4, 2, 1]

const deleteElem4 = (array, index) => {
  return array.filter((item) => item !== index)
}

console.log(deleteElem4(array9, 1)) // [2, 3, 4, 5, 4, 2]

/* Task 9 */
const isEmptyArr = (array) => {
  return !array.length > 0
}

console.log(isEmptyArr([])) // true
console.log(isEmptyArr([1, 2, 3])) // false

/* Task 10 */
// Спосіб 1:
const isEmptyObj = (object) => {
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      return false
    }
  }
  return true
}

console.log(isEmptyObj({ name: 'Slavik' })) // false
console.log(isEmptyObj({})) // true

// Спосіб 2:
const isEmptyObj2 = (object) => {
  return !Object.keys(object).length > 0
}

console.log(isEmptyObj2({ name: 'Slavik' })) // false
console.log(isEmptyObj2({})) // true

/* Task 11 */
const arr1 = [1, 2, 3]
const arr2 = [4, 5, 6]

// Спосіб 1: метод concat()
const concatArr = (arr1, arr2) => {
  return [].concat(arr1, arr2)
}

console.log(concatArr(arr1, arr2)) // [1, 2, 3, 4, 5, 6]

// Спосіб 2: spread оператор
const spreadOperator = (arr1, arr2) => {
  return [...arr1, ...arr2]
}

console.log(spreadOperator(arr1, arr2)) // [1, 2, 3, 4, 5, 6]

/* Task 12 */
// Спосіб 1: цикл for
const multArr = (array) => {
  const resultArr = []

  for (let i = 0; i < array.length; i++) {
    const current = array[i]
    resultArr.push(current ** 3)
  }

  return resultArr
}

console.log(multArr([1, 2, 3])) // [1, 8, 27]

// Спосіб 2: метод map()
const multArr2 = (array) => {
  return array.map((item) => item ** 3)
}

console.log(multArr2([1, 2, 3])) // [1, 8, 27]

// Спосіб 3: вибір степені
const multArr3 = (array, target) => {
  return array.map((item) => item ** target)
}

console.log(multArr3([1, 2, 3], 4)) // [1, 16, 81]

/* Task 13 */
// Спосіб 1: цикл for
function oddItems(array) {
  const resultArr = []

  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      resultArr.push(array[i])
    }
  }

  return resultArr
}

console.log(oddItems([1, 3, 4, 5, 6])) // [1, 3, 5]

// Спосіб 2: метод filter()
function oddItems2(array) {
  return array.filter((item) => item % 2 !== 0)
}

console.log(oddItems2([1, 3, 4, 5, 6])) // [1, 3, 5]

/* Task 14 */
// Спосіб 1: цикл for
const parseInteger = (array) => {
  const resultArr = []

  for (let i = 0; i < array.length; i++) {
    const current = array[i]
    if (current == parseInt(current)) {
      resultArr.push(current)
    }
  }

  return resultArr
}

console.log(parseInteger([5, 3.14, 4.1, 10, 11, 20.1])) // [5, 10, 11]

// Спосіб 2: метод filter
const parseInteger2 = (array) => {
  return array.filter((item) => item == parseInt(item))
}

console.log(parseInteger2([5, 3.14, 4.1, 10, 11, 20.1])) // [5, 10, 11]

/* Task 15 */
function nothing() {}
console.log(nothing()) // undefined
