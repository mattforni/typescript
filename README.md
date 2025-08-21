# TypeScript Documentation

This repository contains comprehensive TypeScript documentation organized into focused sections for easy navigation and learning.

## 📚 Documentation Sections

### [TypeScript Basics](markdown/basics.md)
Covers fundamental TypeScript concepts including:
- **Compilation**: How to compile TypeScript with different targets
- **Variables**: Understanding `var`, `let`, and `const` with scope and hoisting
- **Functions**: Parameter types, return types, and anonymous functions with contextual typing
- **Object Types**: Working with objects and optional properties
- **Type Annotations**: How to explicitly type variables
- **Strictness Options**: Configuration for type safety including `noImplicitAny` and `strictNullChecks`

### [TypeScript Types](markdown/types.md)
Explores the TypeScript type system including:
- **Primitives**: Basic types like strings, numbers, booleans, and arrays
- **Union Types**: Combining multiple types for flexible values
- **Type Aliases**: Creating reusable type definitions
- **Interfaces**: Defining object structures with extensibility
- **Type Assertions**: Converting between compatible types
- **Literal Types**: Specific value types for precise control

### [TypeScript Narrowing](markdown/narrowing.md)
Advanced type narrowing techniques including:
- **Type Guards**: Custom functions that narrow types at runtime
- **Discriminated Unions**: Using literal properties to distinguish between types
- **Control Flow Analysis**: How TypeScript narrows types through conditional statements
- **Type Predicates**: Using `is` keyword for custom type guards
- **Exhaustiveness Checking**: Ensuring all union type cases are handled
- **Narrowing with `in` operator**: Checking for property existence

### [TypeScript Functions](markdown/functions.md)
Comprehensive guide to functions in TypeScript including:
- **Function Types**: Call signatures, construct signatures, and function type expressions
- **Generic Functions**: Type parameters and constraints for reusable function logic
- **Function Overloads**: Multiple function signatures for different parameter combinations
- **Contextual Typing**: How TypeScript infers types in function expressions
- **Function Properties**: Adding custom properties to functions
- **Higher-Order Functions**: Functions that take or return other functions

## 🚀 Getting Started

To compile TypeScript files, use the TypeScript compiler:

```bash
tsc --target ES2015 your-file.ts
```

## 📖 Additional Resources

- [TypeScript Official Documentation](https://www.typescriptlang.org/docs/)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [TypeScript GitHub Repository](https://github.com/microsoft/TypeScript)