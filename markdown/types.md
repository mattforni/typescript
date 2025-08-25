# TypeScript Types

## Primitives
JavaScript has three very commonly used [primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive): `string`, `number`, and `boolean`. Note that JavaScript does not have special runtime values for integers, so there is no equivalent to `int` or `float`.

### Arrays
Arrays can be specified using the bracket notation (`[]`). An array of strings is of type `string[]`. For numbers it is `number[]`. And so on. Note that this can also be written as `Array<number>`, which means the same thing but makes use of *generics* (e.g. `T<U>`)

### `any`
TypeScript also has a special type, `any` that essentially disables type checking. When a value is of type `any`, you can access any properties of it, which will also be of type `any`.

## Union Types
Union types are formed from two or more other types and represent values that may be *any* one of those types. These types are referred to as the union's *members*. The following function can operate on numbers *and* strings.

```js
function printId(id: number | string) {
  console.log("Your ID is: " + id);
}

printId(104); // Okay
printId("Dude"); // Also okay
printId({ name: "Matt" }) // Not okay!
```

Note that TypeScript will only allow an operation on a value if the operation is valid for *all members* of the union.

## Type Aliases
While it is entirely, and often convenient, to use object and union types directly, it is common to want to use the same type more than once, which is where *type aliases* come into play. A *type alias* is just a *name*  for any *type*, and is declared using the `type` keyword.

```js
type Point = {
  x: number;
  y: number;
};

function printCoord(p: Point) {
  // Do things
}
```

A type alias can actually give a name to *any type* at all, not just object types.

```js
type ID = name | string
```

## Interfaces
An *interface declaration* is another way to name an object type, similar to a `type`. An `interface` works in a similar fashion to a type alas and tells TypeScript to enforce a particular structure on a particular value. This is all TypeScript cares about, so we call it a *structurally typed* type system.

```js
// This is functionally equivalent to a `type`
interface Point {
  x: number;
  y: number;
}
```

The main difference is that a `type` cannot be re-opened to add new properties whereas an interface can always be extended.

## Type Assertions
Type assertions can also be made if needing to convert to either a *more* or *less* specific version of a type.

```js
const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
```

## Literal Types
Literal types are when a value does not refer to a general type, like `string` or `number`, but rather to a specific string or number, such as `left`, `right`, or `25`. This can be incredibly useful for defining acceptable values in an enumeration via union.

```js
type Position = "left" | "right" | "center";
function setPosition(position: Position) {
  // Set the position
}

setPosition("left") // Totally valid
setPosition("centre") // Definitely not valid
```

# Covariance and Contravariance
Covariance and contravariance are type theory terms that describe the relationship between two generic types.

## Covariance
Covariance describes the ability to use a more specific class that produces a more specific class where a less-specific product class is expected. Assuming there is an interface that represents an object that can `make` a certain type:

```js
interface Producer<T> {
  make(): T;
}
```

We can use a `Producer<Cat>` where a `Producer<Animal>` is expected since a `Cat` is an `Animal`.

## Contravariance
Conversely, if we have an interface that can `consume` a certain type, we can use a less specific type wherever the more generic type is expected:

```js
interface Consumer<T> {
  consume: (arg: T) => void;
}
```

Then we can use a `Consumer<Animal>` where a `Consumer<Cat>` is expected, because any function capable of accepting an `Animal` must also accept a `Cat`.

# The `keyof` Type Operator
The `keyof` operator take an object type and produces a string or numeric literal union of it's keys.

```js
type Point = { x: number, y: number };
type P = keyof Point; // type P: "x" | "y"

type Arrayish = { [n: number]: unknown };
type A = keyof Arrayish; // type A: number

type Mapish = { [k: string]: boolean };
type M = keyof Mapish; // type M: string | number
```

Note that `M` is `string | number`. This is because JavaScript object keys are always coerced to strings.

# The `typeof` Type Operator
JavaScript already provides a `typeof` operator that can be used on values in an *expression*, but TypeScript adds a `typeof` operator that can be used in a *type* context to refer to the `type` of a variable or property.


```js
let t = typeof "Hello World!"; // This is the JavaScript form
let s = "Hello World!";
let u: typeof s = "I am alive!"; // TypeScript form
```
