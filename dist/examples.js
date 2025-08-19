"use strict";
/**
 * Compiling this using `tsc hello.ts` will create a `hello.js` file.
 * Running `node hello.js` will execute the code.
 */
console.log("Hello World");
// This is an industrial-grade general-purpose greeter function:
function greet(person, date) {
    // If no date is provided, use today's date
    if (date === undefined) {
        date = new Date();
    }
    return `Hello ${person}, today is ${date.toDateString()}`;
}
// Even though we didn’t tell TypeScript that `person` had the type string it was able to figure that out. That’s a feature, and it’s best not to add annotations when the type system would end up inferring the same type anyway.
let person = "Bert";
const greeting = greet(person);
console.log(greeting);
/**
 * My favorite number is a random number between 0 and 100.
 * @returns A random number between 0 and 100 as a Promise
 */
async function getFavoriteNumber() {
    return Math.random() * 100;
}
function printCoord(p) {
    console.log("The coordinate's x value is " + p.x);
    console.log("The coordinate's y value is " + p.y);
}
printCoord({ x: 100, y: 150 });
function printCoord2D(p) {
    console.log("The coordinate's x value is " + p.x);
    console.log("The coordinate's y value is " + p.y);
}
function printCoord3D(p) {
    console.log("The coordinate's x value is " + p.x);
    console.log("The coordinate's y value is " + p.y);
    console.log("The coordinate's z value is " + p.z);
}
printCoord3D({ x: 1, y: 2, z: 3 });
function setPosition(position) {
    console.log(`Setting position to ${position}`);
}
setPosition("left");
// setPosition("centre"); Not valid
//# sourceMappingURL=examples.js.map