declare function greet(person: string, date?: Date): string;
declare let person: string;
declare const greeting: string;
/**
 * My favorite number is a random number between 0 and 100.
 * @returns A random number between 0 and 100 as a Promise
 */
declare function getFavoriteNumber(): Promise<number>;
/**
 * We can also use type aliases to create more complex types.
 */
type Point = {
    x: number;
    y: number;
};
declare function printCoord(p: Point): void;
/**
 * Interfaces work similarly to type aliases, but they can be extended.
 */
interface Point2D {
    x: number;
    y: number;
}
declare function printCoord2D(p: Point2D): void;
interface Point3D extends Point2D {
    z: number;
}
declare function printCoord3D(p: Point3D): void;
type Position = "left" | "right" | "center";
declare function setPosition(position: Position): void;
type Fish = {
    swim: () => void;
};
type Bird = {
    fly: () => void;
};
type Bear = {
    swim: () => void;
    hibernate: () => void;
};
declare function act(animal: Fish | Bird | Bear): void;
declare function isBear(animal: Fish | Bird | Bear): animal is Bear;
declare function hibernate(animal: Fish | Bird | Bear): void;
interface Circle {
    kind: "circle";
    radius: number;
}
interface Square {
    kind: "square";
    sideLength: number;
}
type Shape = Circle | Square;
declare function getArea(shape: Shape): number | undefined;
/*************
 * Functions *
 *************/
type FunctionWithProperties = {
    (num: number): boolean;
    property: string;
};
declare function actOnCallFunction(fn: FunctionWithProperties): void;
declare function greaterThan10(num: number): boolean;
declare namespace greaterThan10 {
    var property: string;
}
type ObjectWithNum = {
    num: number;
};
type FunctionWithConstructSignature = {
    new (num: number): ObjectWithNum;
};
declare function actOnConstructFunction(constructor: FunctionWithConstructSignature): ObjectWithNum;
declare function firstElement<T>(array: T[]): T | undefined;
declare function longest<T extends {
    length: number;
}>(a: T, b: T): T;
declare let fn: (a: number) => void;
declare let s: string;
declare let u: typeof s;
