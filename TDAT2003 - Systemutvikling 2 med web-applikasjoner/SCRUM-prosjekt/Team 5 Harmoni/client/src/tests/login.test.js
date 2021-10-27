import React from "react"
import ReactDOM from "react-dom";
import renderer from "react-test-renderer"
import LoginForm from "../components/LoginForm/LoginForm.js" 
import LoginPage from "../components/Pages/LoginPage/LoginPage.js"

test("LoginPage renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<LoginPage/>, div);
    ReactDOM.unmountComponentAtNode(div);
});

describe("Login-form component", () => {
    test.skip("Matches the snapshot", () => {
        const form = renderer.create(<LoginForm />);
        expect(form.toJSON()).toMatchSnapshot(); 
    });
});