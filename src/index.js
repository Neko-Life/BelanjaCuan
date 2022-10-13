"use strict";

const { login } = require("./login");
const { signUp } = require("./signup");
const { revertRedBorder1px } = require("./util");
const {
    USERNAME_INPUT_ID,
    PASSWORD_INPUT_ID,
    LOGIN_BUTTON_ID,
    SIGNUP_BUTTON_ID,
} = require("./constant.json");

// button login onclick
document.getElementById(LOGIN_BUTTON_ID).addEventListener("click", login);

// button signup onclick
document.getElementById(SIGNUP_BUTTON_ID).addEventListener("click", signUp);

// username input text on change
const elementUsername = document.getElementById(USERNAME_INPUT_ID);
elementUsername.addEventListener("change", () => {
    revertRedBorder1px(elementUsername);
});

// password input text on change
const elementPassword = document.getElementById(PASSWORD_INPUT_ID);
elementPassword.addEventListener("change", () => {
    revertRedBorder1px(elementPassword);
});
