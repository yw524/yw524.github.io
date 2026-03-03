// Yudun Wang
// ITMD 541-04 Graduate Student

// ============================================
// Exercise #1
// ============================================
// minMaxAverage: takes an array of numbers, outputs Total Numbers, Min, Max, Average
function minMaxAverage(arr) {
  if (!arr || arr.length === 0) {
    return "Total Numbers: 0, Min Value: N/A, Max Value: N/A, Average: N/A";
  }
  const total = arr.length;
  const min = Math.min(...arr);
  const max = Math.max(...arr);
  const sum = arr.reduce((acc, n) => acc + n, 0);
  const average = sum / total;
  return `Total Numbers: ${total}, Min Value: ${min}, Max Value: ${max}, Average: ${average}`;
}

console.log("Exercise 1 - minMaxAverage");
console.log(minMaxAverage([2, 5, 23, 6, 9, 4, 30, 1]));
console.log(minMaxAverage([1, 5, 3, 5, 10, 12, 8, 6]));
console.log(minMaxAverage([10, 20, 30, 40, 50]));
console.log(minMaxAverage([7, 14, 21, 28]));

// ============================================
// Exercise #2
// ============================================
// countVowels: takes a string, returns number of vowels (a, e, i, o, u)
function countVowels(str) {
  const vowels = "aeiou";
  const count = (str || "")
    .toLowerCase()
    .split("")
    .filter((char) => vowels.includes(char)).length;
  return `${str}: ${count} vowels.`;
}

console.log("\nExercise 2 - countVowels");
console.log(countVowels("Winter"));
console.log(countVowels("JavaScript"));
console.log(countVowels("education"));
console.log(countVowels("rhythm"));

// ============================================
// Exercise #3
// ============================================
// sortNumbers: takes array of numbers, returns array sorted smallest to largest
function sortNumbers(arr) {
  if (!arr || !Array.isArray(arr)) return [];
  return [...arr].sort((a, b) => a - b);
}

console.log("\nExercise 3 - sortNumbers");
const ex3a = [9, 4, 6, 2];
console.log("Original Array:", ex3a, "Sorted Array:", sortNumbers(ex3a));
const ex3b = [33, 11, 22, 5, 8];
console.log("Original Array:", ex3b, "Sorted Array:", sortNumbers(ex3b));
const ex3c = [100, 1, 50, 25, 75];
console.log("Original Array:", ex3c, "Sorted Array:", sortNumbers(ex3c));

// ============================================
// Exercise #4
// ============================================
// celsiusToFahrenheit: converts Celsius to Fahrenheit; accepts number or string number
// F = (C * 9/5) + 32. Output one decimal place.
function celsiusToFahrenheit(celsius) {
  const c = typeof celsius === "string" ? parseFloat(celsius) : Number(celsius);
  if (Number.isNaN(c)) return "Invalid input";
  const f = (c * 9) / 5 + 32;
  return `${c.toFixed(1)} Celsius = ${f.toFixed(1)} Fahrenheit`;
}

console.log("\nExercise 4 - celsiusToFahrenheit");
console.log(celsiusToFahrenheit(30));
console.log(celsiusToFahrenheit(0));
console.log(celsiusToFahrenheit(100));
// string value tests
console.log(celsiusToFahrenheit("35"));
console.log(celsiusToFahrenheit("22.5"));

// ============================================
// Exercise #5 (Graduate)
// ============================================
// Sorts people by age (youngest to oldest), returns array of intro strings
// Intro format: "name is age and from city"
function introducePeopleByAge(people) {
  if (!people || !Array.isArray(people)) return [];
  const sorted = [...people].sort((a, b) => a.age - b.age);
  return sorted.map((p) => `${p.name} is ${p.age} and from ${p.city}`);
}

console.log("\nExercise 5 - introducePeopleByAge");
const people1 = [
  { name: "Alice", age: 28, city: "Chicago" },
  { name: "Bob", age: 22, city: "New York" },
  { name: "Carol", age: 35, city: "Boston" },
  { name: "David", age: 19, city: "Chicago" },
  { name: "Eve", age: 31, city: "Seattle" },
];
console.log("Test 1 - Input (5 people):", people1);
console.log("Test 1 - Output:", introducePeopleByAge(people1));

const people2 = [
  { name: "Frank", age: 45, city: "Detroit" },
  { name: "Grace", age: 29, city: "Miami" },
  { name: "Henry", age: 24, city: "Denver" },
  { name: "Ivy", age: 52, city: "Phoenix" },
  { name: "Jack", age: 33, city: "Austin" },
];
console.log("Test 2 - Input (5 people):", people2);
console.log("Test 2 - Output:", introducePeopleByAge(people2));
