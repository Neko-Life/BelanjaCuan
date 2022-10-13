"use strict";

const { setUser } = require("./users");
const { goToPage } = require("./util");

/**
 * Log out current user and return to login page
 */
const logOut = () => {
    if (confirm("Are you sure you want to log out?")) {
        setUser(null);
        goToPage("/");
    }
}

module.exports = {
    logOut,
}
