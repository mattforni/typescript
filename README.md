# Compilation
Note that by default TypeScript will compile to ES5. However, the great majority of current browsers support ES2015. Most developers can therefore safely specify ES2015 or above as a target, unless compatibility with certain ancient browsers is important. This can be specified in the `tsconfig.json` file. of via the `target` flag.

```bash
tsc --target ES2015 hello.ts
```

# Variables
In JavaScript, `var`, `let`, and `const` are keywords used to declare variables, but they differ significantly in scope, hoisting behavior, and mutability.

**NOTE** `var` is considered dated and should not be used when `let` or `const` will more accurately define the scope and behavior.

`let` was introduced in ES6 and is block-scoped, meaning it is only accessible within the block (e.g., {}) where it is declared, such as inside loops or conditional statements. Like `var`, `let` is hoisted but remains in a "temporal dead zone" until the variable is initialized, so accessing it before declaration throws a `ReferenceError`. `let` variables **can be updated** but **cannot be re-declared within the same scope**, which helps prevent bugs related to accidental re-declaration.

`const` is also block-scoped, similar to `let`, and is used to declare constants that **cannot be reassigned after initialization**. It is hoisted but also remains in the temporal dead zone until initialization, so accessing it before declaration results in a **ReferenceError**. A `const` variable must be initialized at the time of declaration and **cannot be re-declared or reassigned**. While the variable assignment itself cannot change, if the const variable holds an object or array, its properties or elements can still be modified.

`var` is function-scoped or globally scoped, meaning a variable declared with `var` is accessible throughout the entire function it's declared in, or globally if declared outside a function. It is hoisted to the top of its scope and initialized with `undefined` before code execution, allowing it to be accessed before declaration, which can lead to unexpected behavior.

# Functions
TypeScript enables a developer to specify both the *input* and *output* of a function.

## Parameter Types
When function parameters have type annotations, parameters will be type checked. Even if there are no type annotations TypeScript will check that you passed the right number of arguments.

## Return Types
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

## Anonymous Functions
Anonymous functions are a bit different since the parameters of that function are automatically given types if TypeScript can determine how it is going to be called.

```js
const names = ["Mary", "Jane", "Adam"];

// Contextual typing is used to determine the type of the parameter
names.forEach((s) => {
  console.log(s.toUpperCase());
})
```

TypeScript uses the types of the `forEach` function and the inferred type of the array to determine the type `s` will have. This is called *contextual typing*.

# Object Types
Object types are the most common sort of type and refer to any JavaScript value with properties. Objects can also specify that some or all of their properties are optional by adding a `?` after the property name.

```js
function printName(name: { first: string, last?: string}) {
  console.log(`Hello ${name.first.toUpperCase()} ${name.last?.toUpperCase()}`);
}

printName({ first: "Robert" });
printName({ first: "Robert", last: "Smith"});
```

Optional properties are `undefined`, so it is important to check their value before using them. They can be used safely using modern JavaScript syntax via the `?` operator.

# Union Types
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

# Primitives
JavaScript has three very commonly used [primitives](https://developer.mozilla.org/en-US/docs/Glossary/Primitive): `string`, `number`, and `boolean`. Note that JavaScript does not have special runtime values for integers, so there is no equivalent to `int` or `float`.
## Arrays
Arrays can be specified using the bracket notation (`[]`). An array of strings is of type `string[]`. For numbers it is `number[]`. And so on. Note that this can also be written as `Array<number>`, which means the same thing but makes use of *generics* (e.g. `T<U>`)
## `any`
TypeScript also has a special type, `any` that essentially disables type checking. When a value is of type `any`, you can access any properties of it, which will also be of type `any`.

# Type Annotation
## On Variables
When variables are declared using `const`, `var`, or `let`, it is possibly to add a type annotation, though it is not usually necessary as TypeScript will usually infer the type.

```js
let myName: string = "Alice";

// Functionally equivalent to the following since 'myName' inferred as type 'string'
let myName = "Alice";
```

# Strictness
## `noImplicitAny`
Issues errors on any variables whose type is implicitly inferred as `any`. I.E. Any variable that is not explicitly typed.

## `strictNullChecks`
Makes handling `null` and `undefined` more explicit.
