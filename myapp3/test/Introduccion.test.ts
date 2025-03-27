import { expect, test } from "vitest"
export const sumar = (a: number, b: number) => a + b;


test("Debería sumar los valores 1 y 2", () => {

    // arrange
    const a = 1;
    const b = 2;

    // act
    const result = sumar(a, b);

    // assert
    expect(result).toBe(3);
});