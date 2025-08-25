# Classes
TypeScript offers full support of the `class` keyword introduced in ES2015, adding type annotations and other syntax. The most basic class is the empty class.

```js
class Point {}
```

## Class Members
This class is not particularly useful though. It needs *members*.

### Fields
The most basic class member is a *field*, which can have type annotations, but defaults to `any` if there are no annotations or default values.

```js
class Point {
  x: number;
  y: number;
}

class Point {
  x = 0; // Defaults to 0 and infers a type of `number`
  y = 0; // Same as above
}
```

The `strictPropertyInitialization` setting can be set to enforce the initialization of all class fields via the constructor.

```js
class BadGreeter {
  name: string; // Property 'name' has no initializer and is not definitely assigned in the constructor.
}

class GoodGreeter {
  name: string;

  constructor() {
    this.name = "hello";
  }
}
```

Fields can also be prefixed with the `readonly` modifier, which prevents the field from being assigned *outside of the constructor*.

### Constructors
Class constructors are very similar to functions in that they can have type annotations, default values, and overloads. The main differences are that they:

- Cannot have type parameters since these belong on the outer class declaration
- Cannot have return type annotations since they always return a class instance type

```js
class GoodGreeter {
  readonly name: string;

  constructor(name: string);
  constructor(name: number);
  constructor(name: string | number = "Matthew") {
    // Logic here
  }
}
```

These classes behave the same was as they do in JavaScript in that base classes **must** class `super()` before using any `this.` members. Not following this behavior will access a wrong value in ES5 and throw an exception in ES6.

### Methods
A function property on a class is called a *method*, which follow all of the normal functionality of JavaScript functions in TypeScript with the addition of standard type annotations. Note that class fields must be accessed via `this.` otherwise TypeScript will attempt to access a variable in the enclosing scope.

```js
let x: number = 4;

class C {
  x: string = "Hello";

  m() {
    x = "world!";
    // Type 'string' is not assignable to type 'number'.
  }
}
```

### Getters / Setters
TypeScript also supports *accessor* methods via the `get` and `set` keywords, but has a few interesting quirks.
- If a `get` method is defined without an equivalent `set` method, the variable is automatically set to `readonly`.
- If the type of the `set` method is not specified, TypeScript infers the type using the `get` method.

## Class Heritage
Like other object-oriented languages, classes in JavaScript can *inherit* from base classes.

### `implements`
An `implement` clause can be used to assert that a class satisfies a particular `interface`. Classes can implement multiple interfaces.

```js
interface Greets {
  greet(): void;
}

interface Dood {
  doodly(): void;
}

class Doorman implements Dood, Greets {
  doodly() {
    console.log("I am doodly");
  }

  greet() {
    console.log("Hello there!");
  }
}
```

Note that an `implements` clause is **only a check** that a class can be treated as an interface. It **does not** change the type of the class or or its methods at all. This means that `implements` does not change how the class body is checked or type inferred. Nor does implementing an interface with an optional property mean that property has been created on the class.

### `extends`
Classes may also `extend` from a base class. All children of the base class have all the properties and methods of the base class. Child classes can then define additional members, including fields and methods, overriding methods of the base class or accessing them via the `super.` syntax.

```js
class Animal {
  move() {
    console.log("Moving...");
  }
}

class Dog extends Animal {
  bark() {
    console.log("Barking...");
  }

  move() {
    this.bark(); // Bark before moving
    super.move();
  }
}

let dog = new Dog();
dog.move();
```

Remember that it is important for a derived class to follow the contract laid out in the base class. While it is legal for a derived class to change the signature of the base class, it makes interacting with the derived class a bit funky.


## Initialization Order
Note that JavaScript initializes class hierarchies by:
- Initializing base class fields
- Running base class constructor
- Initializing derived class fields
- Running derived class constructor

## Visibility
### `public`
By default, all class members (e.g. fields and functions) have `public` visibility, meaning they can be accessed anywhere. Visibility can also explicitly be set to public by using the `public` keyword in front of a field or function definition.

### `protected`
Members preceded by `protected` may only be access within the current class and subclasses of the class in which they are declared. Note that derived classes can choose to expose variables if they do not explicitly repeat the declaration of `protected` or `private` modifiers.

```js
const protectedChild = new ProtectedChild();
protectedChild.sayHello();
// protectedChild.name = "No Name";
// Property 'name' is protected and only accessible within class 'Protected' and its subclasses.

const superProtected = new SuperProtected();
superProtected.sayHello();
superProtected.updateName();
superProtected.sayHello();
superProtected._name = "Whatever";
superProtected.sayHello();
```

### `private`
`private` acts much like `protected`, but does not allow derived classes to access the members. This means that derived classes are also not able to increase the visibility of these members, since they themselves do not have visibility into the members. Different OOP languages have different approaches to allowing access of each others' private members. Many languages do allow this, including TypeScript, but Ruby does not.

## Static Members
Classes may also have `static` members that are not associated with any particular instance of a class, but rather with the class itself. Static members may also use the same `public`, `protected`, and `private` modifiers to specify visibility. Static members are also inherited. There are a few special static names that cannot be used (e.g. `name`, `length`, and `call`) since they are reserved by `Function`.

## Generic Classes
Classes can also be generic, the same way interfaces can be generic. When a generic class is instantiated with `new` its type parameters are inferred the same way as in a function call.

```js
class GenericBox<T> {
  protected _contents: T;

  constructor(contents: T) {
    this._contents = contents;
  }

  get contents() {
    return this._contents;
  }
}

const stringBox = new GenericBox<string>("Goodbye, my love!");
console.log(stringBox.contents);
```

Any static members of a class do not have access to any type parameters since there is a single static variable for that property slot.

## `this` Types
In classes, a special type called `this` *dynamically* refers to the type of the current class.

## Parameter Properties
TypeScript offers special syntax for turning a constructor parameter into a class property with the same name and value. These are called *parameter properties* and they are created by prefixing a constructor parameter with one of the visibility modifiers.