"use strict";

/**
 * @typedef {object} UserData
 * @property {string} username
 * @property {string} password
 */

/**
 * User database, kita bisa tambah/hapus user disini.
 * Sign up harus menambahkan user, dll.
 * @type {Map<string, UserData>}
 */
const _users = new Map();

/**
 * Get user from db
 * @param {string} username 
 * @returns {UserData}
 */
const getUser = (username) => {
    return _users.get(username);
}

/**
 * Set/add user to db
 * @param {string} username 
 * @param {UserData} data 
 * @returns {Map<string, UserData>}
 */
const setUser = (username, data) => {
    return _users.set(username, data);
}

/**
 * Remove user from db
 * @param {string} username 
 * @returns {boolean}
 */
const removeUser = (username) => {
    return _users.delete(username);
}

module.exports = {
    getUser,
    setUser,
    removeUser,
}
