"use strict";

const { setCurrentUser } = require("./session");
const { getUser } = require("./users");
const { goToPage, redBorder1px } = require("./util");
const { USERNAME_INPUT_ID, PASSWORD_INPUT_ID } = require("./constant.json");

const login = () => {
    const elementUsername = document.getElementById(USERNAME_INPUT_ID); // Id element input username
    const elementPassword = document.getElementById(PASSWORD_INPUT_ID); // Id element input password

    const username = elementUsername.attributes.value;
    const password = elementPassword.attributes.value;

    const userData = getUser(username);

    if (!userData || password !== userData.password) {
        // kita buat textbox login border merah
        redBorder1px(elementUsername);
        redBorder1px(elementPassword);

        // tampilkan "Invalid username or password"
        alert("Invalid username or password");
    } else {
        setCurrentUser(userData);
        goToPage("page/beranda.html");
    }
}

module.exports = {
    login,
}
