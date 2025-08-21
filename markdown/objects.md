# Objects
In JavaScript, the quintessential way to pass around information is via objects, and the way we represent objects is through *object types*, which can be anonymous or explicitly defined via *interface* or a *type alias*.

```js
// Anonymous
function greet(person: { name: string, age: number}) {
  // Do Something
}

// Interface
interface Person {
  name: string;
  age: number;
}

function greet(person: Person) {
  // Do Something
}

// Type Alias
type Person = {
  name: string;
  age: number;
}

function greet(person: Person) {
  // Do Something
}
```

All of these are functionally equivalent.

# Property Modifiers
## Optional Properties
Properties can be marked as optional using the `?` operator.

```js
interface Car {
  color: string;
  hemi?: boolean;
}
```

## `readonly` Properties
Properties can also be marked as read-only be prepending them with the `readonly` operator, which means they cannot be written to during type checking.

```js
interface SomeObject {
  readonly property: string;
}

function doSomething(obj: SomeObject) {
  obj.property = "something" // Cannot assign to 'prop' because it is a read-only property.
}
```

Note that marking a property as `readonly` does not render it completely immutable, but rather ensures the property cannot be written to. This does not mean that the properties for a readonly property cannot be modified if it is an `object`.

## Index Signatures
Index signatures can be added to an interface or type alias using the `index` keyword.

```js
interface StringArray {
  [index: number]: string;
}

const myArray: StringArray = getStringArray();
const secondItem = myArray[1];
```

String index signatures are an incredibly powerful way to describe the "dictionary" pattern, but it should be noted that all properties must then match the return type of the string index return type. Index signatures can also be made `readonly` to prevent assignment of their indices.

```js
interface ReadonlyStringArray {
  readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = getReadOnlyStringArray();
myArray[2] = "Mallory"; // Index signature in type 'ReadonlyStringArray' only permits reading.
```

# Excess Property Checks
When passing object literals to a function as an argument, TypeScript will perform excess property checking to ensure that all properties are in fact expected. If there are additional properties that are not defined in the method signature, an error will be thrown. This check can be circumvented by using a type assertion, or adding a string index signature that essentially tells TypeScript any number of properties can be provided.

# Extending Types
Is is pretty common to have type hierarchies where certain types are more specific versions of other types. In these cases, we don't want to have to repeat all the fields of the more generic type. Luckily, we can use the concept of extension.

```js
interface Address {
  name?: string;
  street: string;
  city: string;
  country: string;
  postalCode: string;
}

interface AddressWithUnit extends Address {
  unit: string;
}
```

The `extends` keyword allows us to effectively copy members of other named types, while enabling the addition of whatever new members. `interface`s can also extend from multiple types.

```js
interface Colored {
  color: string;
}

interface Circle {
  radius: number;
}

interface ColoredCircle extends Colored, Circle {}
```

# Intersection Types
Types can also be constructed by taking the intersection of the properties defined in two or more `interface`s.


```js
type ColoredCircle = Colored & Circle;
```

# Extension vs Intersection
Both extension and intersection can be used to make composite types, but they have slightly different behavior. In extension, an error is thrown if two `interface`s have similarly named properties that have different types. In intersection, the properties are automatically merged with the type `never`.

# Tuples
A *tuple type* is a special type of array that knows exactly how many elements it has, and which types are contained at which locations. At runtime, a tuple has no special representation, but it is significant to TypeScript. Tuples **cannot** be indexed past their defined length, and they can be destructured using JavaScript's array destructuring.

```js
type StringNumberTuple = [string, number];

function doSomething(pair: StringNumberTuple) {
  const third = pair[2]; // Tuple type '[string, number]' of length '2' has no element at index '2'.
  const [first, second] = pair; // We can destructure the tuple though
}
```

It is also worth nothing that the *tuple* type can have optional properties via the `?` operator. The optional properties must come at the end of the tuple and affect the length property, turning it into a union. They also support *rest parameters* in any combination.

```js
type Point2dOr3d = [number, number, number?];
type StringNumberBooleans = [string, number, ...boolean[]];
```
