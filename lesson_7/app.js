/* Task 1 */
const obj = {};
const zeroObj = Object.create(null);
const map = new Map();
const n = 100;

console.time('Object');
obj.key = n;
console.timeEnd('Object');

console.time('ObjectZero');
zeroObj.key = n;
console.timeEnd('ObjectZero');

console.time('Object');
map.set('key', n);
console.timeEnd('Object');

/* Task 2 */
// const object = { name: 'Yaroslav', surname: 'Didyk', age: 22 };

// // Спосіб 1:
// function objectToMap(object) {
//   return new Map(Object.entries(object));
// }

// console.log(objectToMap(object));

// // Спосіб 2:
// function objectToMap2(object) {
//   const map = new Map();

//   for (const key in object) {
//     map.set(key, object[key]);
//   }

//   return map;
// }

// console.log(objectToMap2(object));

// /* Task 3 */
// const map = new Map(Object.entries(object));

// // Спосіб 1
// function MapToObject(map) {
//   return Object.fromEntries(map.entries());
// }

// console.log(MapToObject(map));

// // Спосіб 2
// function MapToObject2(map) {
//   const object = {};

//   for (const [key, value] of map) {
//     object[key] = value;
//   }

//   return object;
// }

// console.log(MapToObject2(map));
