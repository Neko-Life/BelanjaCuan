"use strict";

let currentUser = null;

/**
 * Get logged-in user for this session
 * @returns {UserData}
 */
const getCurrentUser = () => {
    return currentUser;
}

/**
 * Set logged-in user for this session
 * @param {UserData} user 
 * @returns {UserData}
 */
const setCurrentUser = (user) => {
    return currentUser = user;
}

module.exports = {
    getCurrentUser,
    setCurrentUser,
}
