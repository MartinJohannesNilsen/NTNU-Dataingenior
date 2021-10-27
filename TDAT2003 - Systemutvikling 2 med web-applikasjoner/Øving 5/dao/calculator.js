module.exports = class Calculator {
  constructor() {}

  calculate(expression) {
    let pos = expression.indexOf("+");
    if (pos >= 0) {
      return (
        this.calculate(expression.substr(0, pos)) +
        this.calculate(expression.substr(pos + 1))
      );
    } else {
      pos = expression.indexOf("-");
      if (pos >= 0) {
        return (
          this.calculate(expression.substr(0, pos)) -
          this.calculate(expression.substr(pos + 1))
        );
      } else {
        // Remove ALL whitespaces
        expression = expression.replace(/\s+/g, "");
        if (expression === "") {
          return 0;
        }

        let num = Number(expression);
        if (!Number.isInteger(num)) {
          console.log("'" + expression + "' is not an integer");
          throw new Error("'" + expression + "' is not an integer");
        } else {
          return num;
        }
      }
    }
    return 0;
  }
};
