"use strict";

const { getCurrentUser } = require("./session");

const goToPage = (href) => {
    if (href !== "/" && !getCurrentUser()) {
        alert("You're not logged in! Please log in first!");
        return;
    }
    window.location.href = href;
}

const redBorder1px = (element) => {
    element.style.setProperty("border", "1px solid red");
    element.style.setProperty("border", "1px solid red");
}

const revertRedBorder1px = (element) => {
    element.style.setProperty("border", "initial");
    element.style.setProperty("border", "initial");
}

module.exports = {
    goToPage,
    redBorder1px,
    revertRedBorder1px,
}