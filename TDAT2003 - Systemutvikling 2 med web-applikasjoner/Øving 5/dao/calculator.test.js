const Calculator = require("./calculator");
let calc = new Calculator();

beforeEach(() => {
  console.log("calculator.test: beforeEach");
});

afterEach(() => {
  console.log("calculator.test: afterEach");
});

beforeAll(() => {
  console.log("calculator.test: beforeAll");
});

afterAll(() => {
  console.log("calculator.test: afterAll");
});

test("test plus and minus with any number of arguments", () => {
  expect(calc.calculate("")).toBe(0);
  expect(calc.calculate("2")).toBe(2);
  expect(calc.calculate("2+2")).toBe(4);
  expect(calc.calculate("2+4+3-3+5")).toBe(11);
});

test("test that whitespace is allowed", () => {
  expect(calc.calculate(" \t\n\r2 +\n3")).toBe(5);
});

test("test that only digits and plus and minus and whitespace is allowed", () => {
  let illegal = ["1.2", "1,2", "1/2", "1*2", "1 plus 2"];
  for (i in illegal) {
    expect(() => calc.calculate(illegal[i])).toThrow();
  }
});
