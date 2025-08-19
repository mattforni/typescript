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
