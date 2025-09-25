// Array High-Order Functions Practice

// 1. Given an array of numbers, use the `map` function to create a new array that contains the square of each number.
const numbers = [1, 2, 3, 4, 5];
const squares = numbers.map(num => num * num);
console.log('Squares:', squares); // [1, 4, 9, 16, 25]  
// 2. Given an array of strings, use the `filter` function to create a new array that contains only the strings that have a length greater than 3.
const strings = ['hi', 'hello', 'hey', 'greetings', 'yo'];
const longStrings = strings.filter(str => str.length > 3);
console.log('Long Strings:', longStrings); // ['hello', 'greetings']    
// 3. Given an array of objects representing people with properties `name` and `age`, use the `find` function to locate the first person who is older than 18.
const people = [
    { name: 'Alice', age: 17 },
    { name: 'Bob', age: 19 },
    { name: 'Charlie', age: 16 }
];
const adult = people.find(person => person.age > 18);
console.log('First Adult:', adult); // { name: 'Bob', age: 19 }
// 4. Given an array of numbers, use the `reduce` function to calculate the sum of all the numbers in the array.
const nums = [1, 2, 3, 4, 5];
const sum = nums.reduce((accumulator, current) => accumulator + current, 0);
console.log('Sum:', sum); // 15
// 5. Given an array of strings, use the `forEach` function to print each string to the console in uppercase.
const words = ['apple', 'banana', 'cherry'];  
words.forEach(word => console.log(word.toUpperCase())); // 'APPLE', 'BANANA', 'CHERRY'
// 6. Given an array of numbers, use the `some` function to check if there is at least one even number in the array.
const numsArray = [1, 3, 5, 7, 8];
const hasEven = numsArray.some(num => num % 2 === 0);
console.log('Has Even Number:', hasEven); // true   
// 7. Given an array of numbers, use the `every` function to check if all numbers in the array are positive.
const allPositive = numsArray.every(num => num > 0);
console.log('All Positive:', allPositive); // true  
// 8. Given an array of objects representing products with properties `name` and `price`, use the `filter` function to create a new array that contains only the products that cost more than $20.
const products = [
    { name: 'Book', price: 15 },
    { name: 'Laptop', price: 1200 },
    { name: 'Phone', price: 800 },
    { name: 'Pen', price: 2 }
];
const expensiveProducts = products.filter(product => product.price > 20);
console.log('Expensive Products:', expensiveProducts); // [{ name: 'Laptop', price: 1200 }, { name: 'Phone', price: 800 }]
// 9. Given an array of strings, use the `map` function to create a new array that contains the length of each string.
const fruits = ['apple', 'banana', 'cherry'];   
const fruitLengths = fruits.map(fruit => fruit.length);
console.log('Fruit Lengths:', fruitLengths); // [5, 6, 6]   