# Function Type Expressions
This simplest way to describe a function is with a *function type expression*. These types are syntactically similar to arrow functions:

```js
function greet(fn: (greeting: string) => void) {
  fn("Say Hello!")
}
```

In the `greet` function there is a function parameter that takes takes one string parameter and returns void.

# Call Signatures
In JavaScript, functions can have properties in addition to being callable, but the *function type expression* does not allow for declaring properties, so we need to employ a *call signature* to decorate something callable with properties.

```js
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
```
# Construct Signatures
JavaScript functions can also be invoked with the `new` operator. TypeScript refers to these as *constructors* because they usually create a new object. You can create a *construct signature* by adding the *new* keyword.

```js
type ObjectWithNum = {
  num: number;
}

type FunctionWithConstructSignature = {
  new (num: number): ObjectWithNum;
}

function actOnConstructFunction(constructor: FunctionWithConstructSignature) {
  const obj = new constructor(10);
  console.log(`We created an object with a num property of ${obj.num}`);
}
```

# Generic Functions
In TypeScript, *generics* are used when we want to describe a correspondence between two values. We do this by declaring a type parameter in the function signature:

```js
function firstElement<Type>(arr: Type[]): Type | undefined {
  return arr[0];
}
```

## Good Generic Guidelines
1. Use constraints when absolutely necessary so TypeScript can otherwise use inference.
2. Always use as few type parameters as possible, ensuring that they relate the types of multiple values.
3. Type parameters should always appear at least twice, relating the types of multiple values.

# Optional Parameters
Parameters can be made optional by appending the `?` operator. Even though these parameters have a specified type, the `?` operator transforms the type into a union with `undefined`.

```js
function f(x?: number) {
  // ...
}

// This function is equivalent to
function f(x: number | undefined) {
  // ...
}
```

A *default* for an optional parameters can also be provided using the `=` operator.

```js
function f(x = 10) {
  // ...
}

f();
f(10);
```

Now the type of `x` is `number` since any `undefined` argument will be replaced with `10`.

# Function Overloads
A function can be called in many different ways if it is defined in many different ways. This could mean a variety of signatures, each with different argument counts and types, that all perform the same action. All of the signatures are define before the function body.

```js
function makeDate(timestamp: number): Date;
function makeDate(m: number, d: number, y: number): Date;
function makeDate(mOrTimestamp: number, d?: number, y?: number): Date {
  if (d !== undefined && y !== undefined) {
    return new Date(y, mOrTimestamp, d);
  } else {
    return new Date(mOrTimestamp);
  }
}
```

In this example, the first two signatures are called *overload signatures*, which can be called directly. The final signature is called the *implementation signature*, which **cannot** be called directly. Because of this it follows that you should always have *two or more* signatures above the implementation of a function when writing an overloaded function.

## Good Overload Guidelines
1. Always prefer parameters with union types instead of overloads when possible.

# Rest Parameters and Arguments
While optional parameters and overloads are great ways to make function that accept a variety of fixed argument counts, it is also possible to define functions that take an *unbounded* number of arguments using *rest parameters*.

```js
function multiply(n: number, ...m: number[]) {
  return m.map((x) => n * x);
}

const a = multiple(10, 1, 2, 3, 4); // a = [10, 20, 30, 40]
```

In the above example, `m` is an array of numbers and can be any length. TypeScript implicitly sets any rest parameters to type `any[]`, and any type annotations must be of the form `Array<T>` or `T[]`.

Rest arguments can be constructed from an iterable object (e.g. an array) using the *spread syntax*.

```js
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];

arr1.push(...arr2);
```

Since arrays are considered immutable, spread syntax cannot be used when passing arguments to a function with a fixed number of parameters without first specifying that it is constant.

```js
const args = [8, 5];
const angle = Math.atan2(...args); // Will raise a compiler error

const args = [8, 5] as const;
const angle = Math.atan2(...args); // Will work just fine!
```

# Parameter Destructuring
The concept of *parameter destructuring* can be used to conveniently unpack an object provided as an argument into multiple local variables in a function body.

```js
function sum({ a, b, c}: { a: number, b: number, c: number }) {
  console.log(a + b + c);
}