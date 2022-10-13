"use strict";

const { setCurrentUser } = require("./session");
const { getUser, setUser } = require("./users");
const { USERNAME_INPUT_ID, PASSWORD_INPUT_ID } = require("./constant.json");

const signUp = () => {
    const elementUsername = document.getElementById(USERNAME_INPUT_ID); // Id element input username
    const elementPassword = document.getElementById(PASSWORD_INPUT_ID); // Id element input password

    const username = elementUsername.attributes.value;
    const password = elementPassword.attributes.value;

    const userData = getUser(username);

    if (userData) {
        // kita buat textbox login border merah
        redBorder1px(elementUsername);

        // tampilkan "Invalid username or password"
        alert("Username already exist!");
    } else {
        const newUser = {
            username,
            password,
        };

        setUser(username, newUser);
        setCurrentUser(newUser);
        alert("Thank you for signing up <3");
        goToPage("page/beranda.html");
    }
}

module.exports = {
    signUp,
}
