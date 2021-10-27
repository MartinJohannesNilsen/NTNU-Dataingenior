beforeEach(() => {
  console.log("dum.test: beforeEach");
});

afterEach(() => {
  console.log("dum.test: afterEach");
});

beforeAll(() => {
  console.log("dum.test: beforeAll");
});

afterAll(() => {
  console.log("dum.test: afterAll");
});

test("test at 1 er 1", () => {
  console.log("dum.test: test 1");
  expect(1).toBe(1);
});

test("test at 2 er 2", () => {
  console.log("dum.test: test 2");
  expect(2).toBe(2);
});

test("test alle expects", () => {
  // Kjør kode
  // før vi verifiserer resultatet

  expect(2 + 2).toBe(4);
  expect(2 + 2).toEqual(4);
  expect(1 + 1).not.toBe(0);
  expect("data").toEqual("data");
  expect(true).toBeTruthy();
  expect(false).not.toBeTruthy();
  expect("1").toBeDefined();
  expect("1").not.toBeUndefined();
  expect(2).toBeLessThan(5);
  expect("Christoph").toMatch(/stop/); // Regular expression
});

someCode = () => {
  throw Error("Feil");
};

test("test exception", () => {
  expect(someCode).toThrow();
});
