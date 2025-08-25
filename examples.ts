/**
 * Compiling this using `tsc hello.ts` will create a `hello.js` file.
 * Running `node hello.js` will execute the code.
 */
console.log("Hello World");

// This is an industrial-grade general-purpose greeter function:
function greet(person: string, date?: Date): string {
    // If no date is provided, use today's date
    if (date === undefined) { date = new Date(); }

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
async function getFavoriteNumber(): Promise<number> {
    return Math.random() * 100;
}

/**
 * We can also use type aliases to create more complex types.
 */
type Point = {
  x: number;
  y: number;
};

function printCoord(p: Point) {
  console.log("The coordinate's x value is " + p.x);
  console.log("The coordinate's y value is " + p.y);
}

printCoord({ x: 100, y: 150 }) ;

/**
 * Interfaces work similarly to type aliases, but they can be extended.
 */
interface Point2D {
  x: number;
  y: number;
}

function printCoord2D(p: Point2D) {
  console.log("The coordinate's x value is " + p.x);
  console.log("The coordinate's y value is " + p.y);
}

interface Point3D extends Point2D {
  z: number;
}

function printCoord3D(p: Point3D) {
  console.log("The coordinate's x value is " + p.x);
  console.log("The coordinate's y value is " + p.y);
  console.log("The coordinate's z value is " + p.z);
}

printCoord3D({ x: 1, y: 2, z: 3 });

type Position = "left" | "right" | "center";
function setPosition(position: Position) {
  console.log(`Setting position to ${position}`);
}

setPosition("left");
// setPosition("centre"); Not valid

type Fish = { swim: () => void };
type Bird = { fly: () => void };
type Bear = { swim: () => void; hibernate: () => void };

function act(animal: Fish | Bird | Bear) {
  if ("swim" in animal) {
    if ("hibernate" in animal) {
      return animal.hibernate();
    }
    return animal.swim();
  }

  return animal.fly();
}

// This acts as a user defined type guard due to the type predicate
function isBear(animal: Fish | Bird | Bear): animal is Bear {
  return (animal as Bear).hibernate !== undefined;
}

function hibernate(animal: Fish | Bird | Bear) {
  if (isBear(animal)) {
    return animal.hibernate();
  }

  return; // None of the other animals know how to hibernate
}

// In this case, `kind` is a discriminant property of `Shape`, which tells us what type of shape it is.
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;

function getArea(shape: Shape) {
  if (shape.kind === "circle") {
    return Math.PI * shape.radius! ** 2;
  }
}

/*************
 * Functions *
 *************/

// This is a *call signature*
type FunctionWithProperties = {
  (num: number): boolean;
  property: string;
}

function actOnCallFunction(fn: FunctionWithProperties) {
  console.log(`${fn.name} has a property called ${fn.property} and returns ${fn(10)}`);
}

function greaterThan10(num: number): boolean {
  return num > 10;
}
greaterThan10.property = "dat property";

actOnCallFunction(greaterThan10);

// This is a *construct signature*
type ObjectWithNum = {
  num: number;
}

type FunctionWithConstructSignature = {
  new (num: number): ObjectWithNum;
}

function actOnConstructFunction(constructor: FunctionWithConstructSignature) {
  const obj = new constructor(10);
  console.log(`We created an object with a num property of ${obj.num}`);
  return obj;
}

// `T` is a *type parameter* that links the input and output of this function
function firstElement<T>(array: T[]): T | undefined {
  return array[0];
}

// The *type parameter* can be constrained by adding an `extends` clause
function longest<T extends { length: number }>(a: T, b: T) {
  if (a.length < b.length) { return b; }
  return a;
}

longest([1, 2, 3], [4, 5]);
longest("hello", "world");

// This function literal is valid, but the return type is not
let fn = function(a: number): void {
  // @ts-expect-error
  return a;
}

let s = "Hello World!";
let u: typeof s = "I am alive!";
console.log(`String '${u}' is of type ${typeof s}`);
