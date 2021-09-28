// Методи рядків:
// toUpperCase() - метод для приведення символів рядка в верхній реєстр
const string1 = "string"
console.log(string1.toUpperCase()) // STRING

// toLowerCase() - метод для приведення символів рядка в нижній реєстр
const string2 = "string"
console.log(string2.toLowerCase()) // string

// repeat - повторяє рядок задану кількість разів передану параметром в метод
const string3 = "string"
console.log(string3.repeat(3)) // stringstringstring

// charAt - повертає символ за вказаним індексом в параметрі
const string4 = "string"
console.log(string4.charAt(4)) // n

// indexOf() - повертає індекс першого знайденого входження вказаного значення в параметр, пошук починається з початку рядка, якщо пошук закінчився невдачею(немає символу) то повертається -1, можна передати другий параметр - позиція з якої слід починати пошук
const string5 = "string"
console.log(string5.indexOf("i", 1)) // 3

// lastIndexOf - повертає індекс останнього знайденого входження вказаного значення в параметр, пошук починається з кінця рядка, якщо пошук закінчився невдачею(немає символу) то повертається -1, можна передати другий параметр - позиція з якої слід починати пошук
const string6 = "stritng"
console.log(string5.lastIndexOf("t")) // 1
console.log(string5.lastIndexOf("t", 6)) // 1

//padStart - додає в початок рядка символи поки не досягне довжини яку потрібно
// Першим аргументом приймає довжину, другим - символи які заповнять рядок
const string7 = "string"
console.log(string6.padStart(11, "#")) // ####stritng

//padEnd - додає в кінець рядка символи поки не досягне довжини яку потрібно
// Першим аргументом приймає довжину, другим - символи які заповнять рядок
const string8 = "string"
console.log(string8.padEnd(11, "#")) // string#####

// trim - видаляє пробіли з двох кінців рядка
const string9 = "  string  "
console.log(string9.trim()) // "string"

// trimEnd - обрізає пробіли в кінці рядка
const string10 = "  string  "
console.log(string10.trimEnd()) // "  string"

// trimStart - обрізає пробіли на початку рядка
const string11 = "  string  "
console.log(string11.trimStart()) // "string  "

// length - повертає довжину рядка
const string12 = "string"
console.log(string12.length) // 6

// endWith - перевіряє чи закінчується рядок символами переданими в параметр
const string13 = "string"
console.log(string13.endsWith("ng")) // true
console.log(string13.endsWith("n")) // false

// startsWith - перевіряє чи починається рядок символами переданими в параметр
const string14 = "string"
console.log(string14.startsWith("str")) // true
console.log(string14.startsWith("t")) // false

// search - перевіряє чи є в рядку вказане в параметрі значення і повертає індекс початку знайденого
const string15 = "hello string"
console.log(string15.search("string")) // 6

// includes - перевіряє чи рядок має вказаний підрядок в рядку
const string16 = "hello string"
console.log(string16.includes("string")) // true
console.log(string16.includes("st")) // true
console.log(string16.includes("gh")) // false

/* slice - витягує частину рядка і повертає новий рядок, приймає два параметри:
  - початок видалення
  - індекс до якого буде видалення(по дефолту до кінця рядка)
*/
const string17 = "string"
console.log(string17.slice(1)) // tring
console.log(string17.slice(2, 4)) // ri

/* substr - витягує частину рядка вказаної довжини, приймає два параметри:
  - стартова позиція
  - довжина
*/
const string18 = "string"
console.log(string18.substr(2, 3)) // rin
console.log(string18.substr(1, 5)) // tring

/* replace - заміняє символи(одне значення), приймає два параметра:
  - символ або рядок який потрібно змінити
  - символ на який буде виконуватись заміна
*/
const string19 = "string string"
console.log(string19.replace("string", "hello")) // hello string

/* replaceAll - заміняє символи(всі значення), приймає два параметра:
  - символ або рядок який потрібно змінити
  - символ на який буде виконуватись заміна
*/
const string20 = "string string"
console.log(string20.replaceAll("string", "hello")) // hello hello

// split - розділяє рядок на символи і розміщає їх в масиві
const string21 = "string"
console.log(string21.split("")) // ['s', 't', 'r', 'i', 'n', 'g']

// Методи чисел
// toString - повертає число в вигляді рядка
const num1 = 12
console.log(num1.toString()) // "12"

// toFixed - видаляє дробову частину, приймає парамтером скільки буде симвоів після коми
const num2 = 12.122
console.log(num2.toFixed(1)) // 12.1

// Number - повертає число з рядка(якщо це не число повертає NaN)
const num3 = "123"
console.log(Number(num3)) // 123
console.log(Number("12Not")) // NaN

// parseInt - повертає цілу частину рядка
const num4 = 12.45
console.log(parseInt(num4)) // 12
console.log(parseInt("123year")) // 123
console.log(parseInt("year123")) // NaN

// parseFloat - повертає повністю рядок
const num5 = 12.45
console.log(parseInt(num5)) // 12.45
console.log(parseInt("123year")) // 123
console.log(parseInt("year123")) // NaN

// Task_1
// Скріпт до краху вкладки через цикл for
// for (let i = 0; i < 5; i--) {
//   console.log(i)
// }

/*
 * Припускаю, що у тебе все гуд спрацювало, але я не дочекався, поки
 * впала вкладка на моєму компі.
 * Натомість підвісив вкладку наступний нескінченний цикл
 */

// txt = "a";
// while(1){
//     txt = txt += "a"; 
//     txt = txt += "a";   
//     txt = txt += "a"; 
//     txt = txt += "a";    
//     txt = txt += "a";    
//     txt = txt += "a";    
//     txt = txt += "a";    
//     txt = txt += "a"; 
//     txt = txt += "a";    
// }

// Task_2
// Приклад 1:
const str = "Test"
const firstChar = str[0].toLowerCase()
const secondChar = str[1].toUpperCase()
const thirdChar = str[2].toUpperCase()
const fourthChar = str[3].toUpperCase()

console.log(firstChar + secondChar + thirdChar + fourthChar) // tEST

// Спрацює правильно, але лише для одного прикладу

// Приклад 2:
const str2 = "Test"

console.log(
  `${str2[0].toLowerCase()}${str2[1].toUpperCase()}${str2[2].toUpperCase()}${str2[3].toUpperCase()}`
)

// Аналогічно, але хочу зауважити, що використання `${}` - це круто. Молодець

// Приклад 3:
let str3 = "Test"
str3 = str3.split("")

for (let i = 0; i < str3.length; i++) {
  if (str3[i] === str3[i].toUpperCase()) {
    str3[i] = str3[i].toLowerCase()
  } else {
    str3[i] = str3[i].toUpperCase()
  }
}

console.log(str3.join(""))

// А це вже універсальний спосіб, молодець

// Типи даних
// Існує спеціальний оператор typeof() який покаже якаого типу є змінна або значення:
console.log(typeof 0) // number
console.log(typeof true) // boolean
console.log(typeof "String") // string (існує три типи лапок: ''; ""; ``)
console.log(typeof null) // object, неточність оператора typeof, null в javascript являється null
console.log(typeof undefined) // undefined
console.log(typeof {}) // object
console.log(typeof Symbol("JS")) // symbol, тип даних, який представляє собою унікальний ідентифікатор
console.log(typeof NaN) // number, насправді це число(NaN можна получити якщо undefined * 1), Not a Number
console.log(typeof 12n) // bigint

// Різниця між var, let, const
/*
var - старіший запис оголошення функції, він створюється глобально і його можна перевизначити
let - створюється у block-scope({}), не можна її наново перестворити, вона доступна тільки в рамках блочного скоупу
const - також видима тільки в block-scope, не можна перепризначити їй значення
*/


/*
 * Підсумок
 * Завдання 1: припускаю, що в тебе все спрацювало гуд, бо ти юзав нескінченний цикл,
 * але у мене його не вистачило, щоб підвісити браузер. 
 * Завдання 2: Останній приклад дійсно універсальний і працює як треба. 
 * Крім того, невелике зауваження по стрилю коду - в JS вважається поганим стилем використовувати
 * подвійні лапки "...", лише '...' або `...`
 */