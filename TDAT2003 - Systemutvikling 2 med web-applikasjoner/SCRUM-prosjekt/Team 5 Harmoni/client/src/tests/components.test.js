import React from "react";
import ReactDOM from "react-dom";
import RegisterPage from "../components/Pages/RegisterPage/RegisterPage";
import LoginPage from "../components/Pages/LoginPage/LoginPage.js"

test("RegisterPage rendrer uten å krasje", () => {
    const div = document.createElement('div');
    ReactDOM.render(<RegisterPage/>, div);
    ReactDOM.unmountComponentAtNode(div)
});