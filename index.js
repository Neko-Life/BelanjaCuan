"use strict";

const products = [
    {
        "nama": "Baju Premium Hitam All Star",
        "harga": 90000,
        "namagambar": "hitamAllstar.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Hitam BAPE",
        "harga": 110000,
        "namagambar": "hitamBape.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Hitam GAP",
        "harga": 100000,
        "namagambar": "hitamGAP.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Hitam Jordan",
        "harga": 90000,
        "namagambar": "hitamJordan.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Hitam Kenzo",
        "harga": 110000,
        "namagambar": "hitamKenzo.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Hitam Micky",
        "harga": 100000,
        "namagambar": "hitamMicky.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Hitam NASA",
        "harga": 90000,
        "namagambar": "hitamNasa.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Hitam Off White",
        "harga": 110000,
        "namagambar": "hitamOffWhite.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Hitam Simpsons",
        "harga": 90000,
        "namagambar": "hitamSimpsons.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Hitam Skull",
        "harga": 100000,
        "namagambar": "hitamSkull.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Hitam Uniqlo",
        "harga": 100000,
        "namagambar": "hitamUniqlo.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Putih 199X",
        "harga": 90000,
        "namagambar": "putih199X.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Putih AAPE",
        "harga": 90000,
        "namagambar": "putihAAPE.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Putih Macan",
        "harga": 110000,
        "namagambar": "putihMacan.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Putih Off White",
        "harga": 100000,
        "namagambar": "putihOffWhite.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Putih Smile",
        "harga": 100000,
        "namagambar": "putihSmile.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Putih Tokyo",
        "harga": 110000,
        "namagambar": "putihTokyo.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Putih Uniqlo",
        "harga": 100000,
        "namagambar": "putihUniqlo.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Putih Unknown",
        "harga": 90000,
        "namagambar": "putihUnknown.JPG",
        "stock": 20
    },
    {
        "nama": "Baju Premium Putih Wave",
        "harga": 90000,
        "namagambar": "putihWave.JPG",
        "stock": 20
    }
];

const USERNAME_INPUT_ID = "username-input";
const PASSWORD_INPUT_ID = "password-input";
const LOGIN_BUTTON_ID = "login-button";
const SIGNUP_BUTTON_ID = "";

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

const goToPage = (path) => {
    if (path !== "/" && !getCurrentUser()) {
        alert("You're not logged in! Please log in first!");
        return;
    }
    window.location.pathname = path;
}

const redBorder1px = (element) => {
    element.style.setProperty("border", "1px solid red");
    element.style.setProperty("border", "1px solid red");
}

const revertRedBorder1px = (element) => {
    element.style.setProperty("border", "initial");
    element.style.setProperty("border", "initial");
}

const createProductCard = ({ nama, harga, namagambar, stock } = {}) => {
    let hargaStr = "";

    const strHarga = harga.toString();

    for (let i = (strHarga.length - 1); i >= 0; i -= 3) {
        let brek = false;
        let j = i;
        for (; j > (i - 3); j--) {
            if (j < 0) {
                brek = true;
                break;
            }

            hargaStr = strHarga[j] + hargaStr;
        }
        if (brek) {
            break;
        }

        if (j > 0) {
            hargaStr = "." + hargaStr;
        }
    }

    return `<div class="product-cell">
        <img class="product-img" src="gambarBaju/${namagambar}" />
        <div class="product-name">${nama}</div>
        <div class="product-price">Rp. ${hargaStr}</div>
        <div class="product-desc">Stok: ${stock}</div>
        <button class="product-add" id="product-add-${nama}">+ Tambah ke keranjang</button>
        <a href="invoice.html"><button class="product-buy" >Beli</button></a>
    </div>`;

}

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

/**
 * Log out current user and return to login page
 */
const logOut = () => {
    if (confirm("Are you sure you want to log out?")) {
        setUser(null);
        goToPage("/");
    }
}

const resetTable = () => {
    const elementTable = document.getElementsByClassName("product-table")[0];
    elementTable.innerHTML = "";
}

const showProducts = () => {
    const elementTable = document.getElementsByClassName("product-table")[0];

    for (let i = 0; i < products.length; i += 3) {
        const tr = document.createElement("tr");

        for (let j = i; j < (i + 3); j++) {
            if (j === products.length) {
                break;
            }

            const data = products[j];

            const td = document.createElement("td");
            td.innerHTML += createProductCard(data);

            tr.appendChild(td);
        }

        elementTable.appendChild(tr);
    }
}

let cart = [];
const loadProductsListener = () => {
    for (const data of products) {
        document.getElementById(`product-add-${data.nama}`).addEventListener("click", (...args) => {
            console.log(args);
            cart.push(data);
        });
    }
}


// button login onclick
const elementLoginButton = document.getElementById(LOGIN_BUTTON_ID);
if (elementLoginButton) elementLoginButton.addEventListener("click", login);

// button signup onclick
const elementSignUpButton = document.getElementById(SIGNUP_BUTTON_ID);
if (elementSignUpButton) elementSignUpButton.addEventListener("click", signUp);

// username input text on change
const elementUsername = document.getElementById(USERNAME_INPUT_ID);
if (elementUsername) elementUsername.addEventListener("change", () => {
    revertRedBorder1px(elementUsername);
});

// password input text on change
const elementPassword = document.getElementById(PASSWORD_INPUT_ID);
if (elementPassword) elementPassword.addEventListener("change", () => {
    revertRedBorder1px(elementPassword);
});

if (window.location.pathname === "/") {
    showProducts();
    loadProductsListener();
}
