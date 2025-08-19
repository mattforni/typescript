# TypeScript Basics

## Compilation
Note that by default TypeScript will compile to ES5. However, the great majority of current browsers support ES2015. Most developers can therefore safely specify ES2015 or above as a target, unless compatibility with certain ancient browsers is important. This can be specified in the `tsconfig.json` file. of via the `target` flag.

```bash
tsc --target ES2015 hello.ts
```

## Variables
In JavaScript, `var`, `let`, and `const` are keywords used to declare variables, but they differ significantly in scope, hoisting behavior, and mutability.

**NOTE** `var` is considered dated and should not be used when `let` or `const` will more accurately define the scope and behavior.

`let` was introduced in ES6 and is block-scoped, meaning it is only accessible within the block (e.g., {}) where it is declared, such as inside loops or conditional statements. Like `var`, `let` is hoisted but remains in a "temporal dead zone" until the variable is initialized, so accessing it before declaration throws a `ReferenceError`. `let` variables **can be updated** but **cannot be re-declared within the same scope**, which helps prevent bugs related to accidental re-declaration.

`const` is also block-scoped, similar to `let`, and is used to declare constants that **cannot be reassigned after initialization**. It is hoisted but also remains in the temporal dead zone until initialization, so accessing it before declaration results in a **ReferenceError**. A `const` variable must be initialized at the time of declaration and **cannot be re-declared or reassigned**. While the variable assignment itself cannot change, if the const variable holds an object or array, its properties or elements can still be modified.

`var` is function-scoped or globally scoped, meaning a variable declared with `var` is accessible throughout the entire function it's declared in, or globally if declared outside a function. It is hoisted to the top of its scope and initialized with `undefined` before code execution, allowing it to be accessed before declaration, which can lead to unexpected behavior.

## Functions
TypeScript enables a developer to specify both the *input* and *output* of a function.

### Parameter Types
When function parameters have type annotations, parameters will be type checked. Even if there are no type annotations TypeScript will check that you passed the right number of arguments.

### Return Types
Much like variable type annotations, it is not usually necessary to specify return types since they are inferred from the functions `return` statements. Some codebases will explicitly specify a return type for documentation purposes.

```js
function greet(name: string): string {
  return `Hello ${name}`;
}
```

If a function should return a promise, use the `Promise` type.

```js
async function getFavoriteNumber(): Promise<number> {
  return 26;
}
```

### Anonymous Functions
Anonymous functions are a bit different since the parameters of that function are automatically given types if TypeScript can determine how it is going to be called.

```js
const names = ["Mary", "Jane", "Adam"];

// Contextual typing is used to determine the type of the parameter
names.forEach((s) => {
  console.log(s.toUpperCase());
})
```

TypeScript uses the types of the `forEach` function and the inferred type of the array to determine the type `s` will have. This is called *contextual typing*.

## Object Types
Object types are the most common sort of type and refer to any JavaScript value with properties. Objects can also specify that some or all of their properties are optional by adding a `?` after the property name.

```js
function printName(name: { first: string, last?: string}) {
  console.log(`Hello ${name.first.toUpperCase()} ${name.last?.toUpperCase()}`);
}

printName({ first: "Robert" });
printName({ first: "Robert", last: "Smith"});
```

Optional properties are `undefined`, so it is important to check their value before using them. They can be used safely using modern JavaScript syntax via the `?` operator.

## Type Annotation
### On Variables
When variables are declared using `const`, `var`, or `let`, it is possibly to add a type annotation, though it is not usually necessary as TypeScript will usually infer the type.

```js
let myName: string = "Alice";

// Functionally equivalent to the following since 'myName' inferred as type 'string'
let myName = "Alice";
```

## Strictness

### `noImplicitAny`
Issues errors on any variables whose type is implicitly inferred as `any`. I.E. Any variable that is not explicitly typed.

### `strictNullChecks`
Makes handling `null` and `undefined` more explicit.

With `strictNullChecks` off, values that might be `null` or `undefined` can still be accessed normally, and the values `null` and `undefined` can be assigned to a property of any type.

With `strictNullChecks` on, when a value is null or undefined, you will need to test for those values before using methods or properties on that value. Just like checking for undefined before using an optional property, we can use narrowing to check for values that might be null:

```js
function doSomething(x: string | null) {
  if (x === null) {
    // do nothing
  } else {
    console.log("Hello, " + x.toUpperCase());
  }
}
```

### Non-null Assertion Operator
Values can be asserted to not be `null` by appending the `!` operator. This tells TypeScript that we are sure the value is not null, but it does get erased at runtime, so you must be sure the value is non-null.

```js
function liveDangerously(x?: number | null) {
  // No error
  console.log(x!.toFixed());
}
```
