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
function act(animal) {
    if ("swim" in animal) {
        if ("hibernate" in animal) {
            return animal.hibernate();
        }
        return animal.swim();
    }
    return animal.fly();
}
// This acts as a user defined type guard due to the type predicate
function isBear(animal) {
    return animal.hibernate !== undefined;
}
function hibernate(animal) {
    if (isBear(animal)) {
        return animal.hibernate();
    }
    return; // None of the other animals know how to hibernate
}
function getArea(shape) {
    if (shape.kind === "circle") {
        return Math.PI * shape.radius ** 2;
    }
}
function actOnCallFunction(fn) {
    console.log(`${fn.name} has a property called ${fn.property} and returns ${fn(10)}`);
}
function greaterThan10(num) {
    return num > 10;
}
greaterThan10.property = "dat property";
actOnCallFunction(greaterThan10);
function actOnConstructFunction(constructor) {
    const obj = new constructor(10);
    console.log(`We created an object with a num property of ${obj.num}`);
}
// `T` is a *type parameter* that links the input and output of this function
function firstElement(array) {
    return array[0];
}
// The *type parameter* can be constrained by adding an `extends` clause
function longest(a, b) {
    if (a.length < b.length) {
        return b;
    }
    return a;
}
longest([1, 2, 3], [4, 5]);
longest("hello", "world");
// This function literal is valid, but the return type is not
let fn = function (a) {
    // @ts-expect-error
    return a;
};
//# sourceMappingURL=examples.js.map