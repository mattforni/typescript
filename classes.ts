class Greeter {
  readonly name: string = "Matthew";

  constructor(name?: string) {
    // If a name is provided, set it to the name property
    if (!!name) { this.name = name; }
  }

  greet() {
    console.log(`Hello, ${this.name}`);
  }
}

let greeter = new Greeter();
greeter.greet();

greeter = new Greeter("John");
greeter.greet();

// greeter.name = "No Name";
// Cannot assign to 'name' because it is a read-only property.

class GoodGreeter extends Greeter {
  readonly name: string;

  constructor(name?: string);
  constructor(name?: number);
  constructor(name: string | number = "Matthew") {
    super();
    if (typeof name === "string") {
      this.name = name;
    } else {
      this.name = name.toString();
    }
  }

  greet() {
    console.log("Good Greeter says...");
    super.greet();
  }
}

const goodGreeter = new GoodGreeter("Petunia");
goodGreeter.greet();

class Accessor {
  private _name: string = "Matthew";

  get name() {
    return this._name;
  }
}

let accessor = new Accessor();
//accessor.name = "No Name";
// Cannot assign to 'name' because it is a read-only property.
// accessor._name = "No Name";
// Property '_name' is private and only accessible within class 'Accessor'.
console.log(accessor.name);

interface Dood {
  doodly(): void;
}

interface Greets {
  greet(): void;
}

class Doorman implements Dood, Greets {
  doodly(): string {
    console.log("I am doodly");
    return "I am doodly";
  }

  doodlyGreeting(): void {
    this.doodly();
    this.greet();
  }

  greet() {
    console.log("Hello there!");
  }
}

let doorman = new Doorman();
doorman.doodlyGreeting();

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

class Song {
  lyric = "🎵 all about that bass 🎵";

  constructor() {
    console.log(`Singing ${this.lyric}`);
  }
}

class NoTreble extends Song {
  lyric = "🎵 no treble 🎵";
}

const song = new NoTreble();

class Protected {
  protected _name: string = "Matthew";
}

class ProtectedChild extends Protected {
  sayHello() {
    console.log(`Hello, ${this._name}`);
  }

  protected set name(name: string) {
    this._name = name;
  }
}

class SuperProtected extends ProtectedChild {
  _name: string = "Matthew"; // This is no longer a protected variable, it is a public variable.

  public updateName() {
    this.name = "No Name";
  }
}


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

class A {
  private str: string = "dis string here";

  constructor(str?: string) {
    if (!!str) { this.str = str; }
  }

  public equals(other: A) {
    return this.str === other.str;
  }
}

const a = new A();
const b = new A("dat string dere");
console.log(a.equals(b));

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

class StringBox extends GenericBox<string> {
  set(contents: string): this {
    this._contents = contents;
    return this;
  }

  // This is a self-referential type as indicated by the `this` type.
  sameAs(other: this) {
    return this._contents === other._contents;
  }
}

class ClearableStringBox extends StringBox {
  clear() {
    this._contents = "";
  }
}

const csb = new ClearableStringBox("Hello, my love!");
const csb2 = csb.set("Goodbye, my love!");

class Params {
  constructor(public readonly x: number, protected y: number, private z: number) {}

  print() {
    console.log(`x: ${this.x}, y: ${this.y}, z: ${this.z}`);
  }
}

const params = new Params(1, 2, 4);
console.log(params.x);
// console.log(point3D.y);
// Property 'y' is protected and only accessible within class 'Point3D' and its subclasses.
// console.log(point3D.z);
// Property 'z' is private and only accessible within class 'Point3D'.
console.log(params.print());



