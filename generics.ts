// Generic function

/**
 * This function just returns the value that is passed in.
 * @param value - The value to return.
 * @returns The value that is passed in.
 */
function identity<T>(value: T): T {
  return value;
}

// Generic function can be called with all parameters, including the type argument
const str1 = identity<string>("Hello, world!");
// Or it can be called without the type argument, which leverages type inference
const str2 = identity("Hello, world!");
console.log(str1);
console.log(str2);

const num1 = identity<number>(123);
const num2 = identity(123);
console.log(num1);
console.log(num2);

// Generic interface
interface GenericIdentityFn<T> {
  (arg: T): T;
}

// Generic interface can be used to create a function that returns the same type as the argument
const numberIdentity: GenericIdentityFn<number> = identity;
const stringIdentity: GenericIdentityFn<string> = identity;

console.log(numberIdentity(123));
console.log(stringIdentity("Hello, world!"));

class GenericNumber<T extends number = number> {
  zeroValue: T;

  constructor(zeroValue: T) {
    this.zeroValue = zeroValue;
  }

  add(x: T, y: T): T {
    return x + y as T;
  }
}

let myGenericNumber = new GenericNumber(0);

// Conditional Types
interface IdLabel {
  id: number;
}

interface NameLabel {
  name: string;
}

type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
  throw "unimplemented";
}

type MessageOf<T> = T extends { message: unknown } ? T["message"] : never;

interface Email {
  message: string;
}

interface Dog {
  bark(): void;
}

type EmailMessageContents = MessageOf<Email>; // type EmailMessageContents: string
type DogMessageContents = MessageOf<Dog>; // type DogMessageContents: never
