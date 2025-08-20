# Narrowing
Narrowing is the process of removing `type`s from a union to properly handle specific cases. There are quite a few different constructs TypeScript uses for narrowing.

## `typeof` Type Guards
JavaScript supports a `typeof` operator which returns very basic information about the type of a value. It can return:

- `"string"`
- `"number"`
- `"bigint"`
- `"boolean"`
- `"symbol"`
- `"undefined"`
- `"object"`
- `"function"`

There are some gotchas with using this type of narrowing since `typeof` does not return `null` and since `typeof null` returns `"object"`. This is an unfortunate reality of the language.


## Truthiness Narrowing
Truthiness can be used to suss out values like `null`. In JavaScript, logic constructs like `if` first coerce their conditions to `boolean`s to make sense of them. Values like:

- `0`
- `NaN`
- `""` (empty string)
- `0n` (`bigint` zero)
- `null`
- `undefined`

all evaluate to `false` after coercion.

## Equality Narrowing
Remember that the `===` and `!==` operator check for equality both of value and type, whereas `==` and `!=` only check if the value is equal. Checking if a value `== null` actually also check if the value is potentially `undefined` and vice versa.

## The `in` Operator
JavaScript has an operator for determining if an object has a property, either directly or in it's prototype chain.

```js
type Fish = { swim: () => void };
type Bird = { fly: () => void };

function move(animal: Fish | Bird) {
  // If the animal *can* swim, make it swim
  if ("swim" in animal) {
    return animal.swim();
  }

  // Otherwise, it has to be a bird, so make it fly!
  return animal.fly();
}
```

# `instanceof` Narrowing

# Assignment
TypeScript will always look to the right side of an assignment to determine typing during assignment.

```js
// `x` is of type `number | string` since it can be assigned either
let x = Math.random() < 0.5 ? 10 : "hello world";

x = 2; // Completely valid
x = "boom!"; // Also completely valid
x = true; // NOPE!!
// Type 'boolean' is not assignable to type 'string | number'.
```

# Control Flow Analysis
TypeScript does some fairly complex analysis of reachability in code blocks referred to as *control flow analysis*. In the following example, it can deduce that since there is a return statement in the `number` block, the value `padding` cannot have the type `number` for the rest of the code block, therefore, it must be a `string`.

```js
function padLeft(padding: number | string, input: string) {
  if (typeof padding === "number") {
    return " ".repeat(padding) + input;
  }
  return padding + input;
}
```

In this way, control flow can split off and re-merge several times per code block. For example:

```js
function example() {
  let x: string | number | boolean;

  x = Math.random() < 0.5; // let x: boolean
  console.log(x);

  if (Math.random() < 0.5) {
    x = "hello"; // let x: string
    console.log(x);
  } else {
    x = 100; // let x: number
    console.log(x);
  }

  return x; // let x: string | number
}
```

# `type` Predicates
We can also define a user-define type guard by defining a function whose return value is a *type predicate*.

```js
function isBear(animal: Fish | Bird | Bear): animal is Bear {
  return (animal as Bear).hibernate !== undefined;
}
```

`animal is Bear` is the *type predicate* in this example. A predicate takes the form `parameterName is Type`, where `parameterName` must be the name of a parameter in the current function signature. Now, anytime `isBear` is called

# `assert` Functions
Types can also be narrowed using [Assertion Functions](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#assertion-functions), which will `throw` an error if something unexpected happens.

# Discriminated Unions
When every `type` in a union has a common property with literal types, TypeScript considers this a *discriminated union*, where the common property is the *discriminant property*, which it uses to separate out the members of the union. For example:

```js
interface Circle {
  kind: "circle";
  radius: number;
}

interface Square {
  kind: "square";
  sideLength: number;
}

type Shape = Circle | Square;
```

In this case, `kind` is the *discriminant property* that indicates what type of `Shape` we are dealing with.

# The `never` Type
The `never` type can be used to represent a state that should never exist. This is primarily used in exhaustiveness checking. The `never` type is assignable to every other type, but no types are assignable to `never`, except `never` itself. This means that it can be relied upon in a `switch` statement to expose when not all cases are covered.

```js
interface Triangle {
  kind: "triangle";
  sideLength: number;
}

type Shape = Circle | Square | Triangle;

function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.sideLength ** 2;
    default:
      const _exhaustiveCheck: never = shape; // Type 'Triangle' is not assignable to type 'never'.
      return _exhaustiveCheck;
  }
}
```