const sum = require("./sum");

beforeEach(() => {
  console.log("sum.test: beforeEach");
});

afterEach(() => {
  console.log("sum.test: afterEach");
});

beforeAll(() => {
  console.log("sum.test: beforeAll");
});

afterAll(() => {
  console.log("sum.test: afterAll");
});

test("adds 1 + 2 to equal 3", () => {
  console.log("Running simple test");
  expect(sum(1, 2)).toBe(3);
});
