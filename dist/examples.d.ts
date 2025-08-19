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
