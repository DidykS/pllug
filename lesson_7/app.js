/* Task 1 */
const object = {};
const objectWithoutPrototype = Object.create(null);
const map = new Map();
const key = 100; // 10000 // 10 000 000

for (let i = 0; i <= key; i++) {
  object[i] = i;
  objectWithoutPrototype[i] = i;
  map.set(i, i);
}

// Add
console.time('Object');
object[key] = key;
console.timeEnd('Object');

console.time('Object Without Prototype');
objectWithoutPrototype[key] = key;
console.timeEnd('Object Without Prototype');

console.time('Map');
map.set(key, key);
console.timeEnd('Map');

// Find
let result;

console.time('Object');
result = object[key];
console.timeEnd('Object');

console.time('Object Without Prototype');
result = objectWithoutPrototype[key];
console.timeEnd('Object Without Prototype');

console.time('Map');
result = map.get(key);
console.timeEnd('Map');

// Delete
console.time('Object');
delete object[key];
console.timeEnd('Object');

console.time('Object Without Prototype');
delete objectWithoutPrototype[key];
console.timeEnd('Object Without Prototype');

console.time('Map');
map.delete(key);
console.timeEnd('Map');

// To Array
let result2;
console.time('Object');
result2 = Object.entries(object);
console.timeEnd('Object');

console.time('Object Without Prototype');
result2 = Object.entries(objectWithoutPrototype);
console.timeEnd('Object Without Prototype');

console.time('Map');
result2 = Array.from(map);
console.timeEnd('Map');

// Clear iteration
let result3;
console.time('Object');
for (const key in object) {
  result3 = key;
}
console.timeEnd('Object');

console.time('Object Without Prototype');
for (const key in objectWithoutPrototype) {
  result3 = key;
}
console.timeEnd('Object Without Prototype');

console.time('Map');
for (const key of map.keys()) {
  result3 = key;
}
console.timeEnd('Map');

// Clear iteration with conversion
let result4;
console.time('Object');
Object.entries(object).forEach(([key, value]) => (result4 = key)); // можна просто [key] якщо value не використовується
console.timeEnd('Object');

console.time('Object Without Prototype');
Object.entries(objectWithoutPrototype).forEach(
  ([key, value]) => (result4 = key) // лишнє value
);
console.timeEnd('Object Without Prototype');

console.time('Map');
Array.from(map).forEach(([key, value]) => (result4 = key)); // лишнє value
console.timeEnd('Map');

/* Task 2 */
const object = { name: 'Yaroslav', surname: 'Didyk', age: 22 };

// Спосіб 1:
function objectToMap(object) {
  return new Map(Object.entries(object));
}

console.log(objectToMap(object));

// Спосіб 2:
function objectToMap2(object) {
  const map = new Map();

  for (const key in object) {
    map.set(key, object[key]);
  }

  return map;
}

console.log(objectToMap2(object));

/* Task 3 */
const map = new Map(Object.entries(object));

// Спосіб 1
function MapToObject(map) {
  return Object.fromEntries(map.entries());
}

console.log(MapToObject(map));

// Спосіб 2
function MapToObject2(map) {
  const object = {};

  for (const [key, value] of map) {
    object[key] = value;
  }

  return object;
}

console.log(MapToObject2(map));

// Файно!