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
const SIGNUP_BUTTON_ID = "signup-button";

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
let cart = {};

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
    currentUser = user;

    const element = document.getElementById("login-nav-button");
    if (element) element.innerText = user?.username || "Login";

    return currentUser;
}

const randomOutOfStockLine = () => {
    const alerts = [
        "belum ada",
        "sudah habis",
        "sudah diborong bang toyib",
        "kurang stok",
        "sudah anda borong",
        "tidak ada",
        "habis dimakan anak anda"
    ];

    return alerts[Math.floor(Math.random() * alerts.length)];
}

/**
 * 
 * @param {URL} url 
 * @returns 
 */
const createUrlParam = (url) => {
    if (Object.keys(cart).length) url.searchParams.set("cart", JSON.stringify(cart));

    const users = [];
    for (const [key, user] of _users) {
        users.push(user);
    }

    if (users.length) {
        url.searchParams.set("users", JSON.stringify(users));
    }

    const user = getCurrentUser();
    if (user) url.searchParams.set("user", user.username);

    return url;
}

const parseUrlParam = () => {
    const searchData = new URLSearchParams(window.location.href);
    const keys = [...searchData.keys()];
    const values = [...searchData.values()];

    for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const value = values[i];
        if (key.endsWith("cart")) {
            const cartJson = value;
            if (cartJson) cart = JSON.parse(cartJson);
        }

        if (key.endsWith("users")) {
            const users = value;
            if (users) {
                const parse = JSON.parse(users);
                for (const data of parse) {
                    if (!data) continue;
                    setUser(data.username, data);
                }
            }
        }

        if (key.endsWith("user")) {
            const user = value;
            if (user) {
                const userData = getUser(user);
                if (userData) {
                    setCurrentUser(userData);
                }
            }
        }
    }
}

const validNamePassword = () => {
    const elementUsername = document.getElementById(USERNAME_INPUT_ID);
    const elementPassword = document.getElementById(PASSWORD_INPUT_ID);
    if (!elementUsername.value?.match(/[a-zA-Z0-9 _-]+/)
        || !elementPassword.value?.match(/[a-zA-Z0-9 _-]+/)) {
        return false;
    }
    return true;
}

const goToPage = (path) => {
    if (path.startsWith("/invoice.html") && !getCurrentUser()) {
        alert("You're not logged in! Please login first!");
        return;
    }
    const url = new URL(window.location.origin + path);

    window.location.href = createUrlParam(url);
}

const redBorder1px = (element) => {
    element.style.setProperty("border", "1px solid red");
    element.style.setProperty("border", "1px solid red");
}

const revertRedBorder1px = (element) => {
    element.style.setProperty("border", "initial");
    element.style.setProperty("border", "initial");
}

const stringifyHarga = (str) => {
    let hargaStr = "";

    const strHarga = str.toString();

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

        if (j >= 0) {
            hargaStr = "." + hargaStr;
        }
    }

    return hargaStr;
}

const createProductCard = ({ nama, harga, namagambar, stock } = {}) => {
    const hargaStr = stringifyHarga(harga);

    if (cart[nama]?.qty) {
        stock -= cart[nama].qty;
    }

    return `<div class="product-cell">
        <img class="product-img" src="gambarBaju/${namagambar}" />
        <div class="product-name">${nama}</div>
        <div class="product-price">Rp. ${hargaStr}</div>
        <div class="product-desc" id="product-desc-${nama}">Stok: ${stock}</div>
        <button class="product-add" id="product-add-${nama}">+ Tambah ke keranjang</button>
        <button class="product-buy" id="product-buy-${nama}">Beli</button>
    </div>`;
}

const login = () => {
    if (!validNamePassword()) {
        return;
    }

    const elementUsername = document.getElementById(USERNAME_INPUT_ID); // Id element input username
    const elementPassword = document.getElementById(PASSWORD_INPUT_ID); // Id element input password

    const username = elementUsername.value;
    const password = elementPassword.value;

    const userData = getUser(username);

    if (!userData || password !== userData.password) {
        // kita buat textbox login border merah
        redBorder1px(elementUsername);
        redBorder1px(elementPassword);

        // tampilkan "Invalid username or password"
        alert("Invalid username or password");
    } else {
        setCurrentUser(userData);
        goToPage("/index.html");
    }
}

const signUp = () => {
    if (!validNamePassword()) {
        return;
    }

    const elementUsername = document.getElementById(USERNAME_INPUT_ID); // Id element input username
    const elementPassword = document.getElementById(PASSWORD_INPUT_ID); // Id element input password

    const username = elementUsername.value;
    const password = elementPassword.value;

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
        goToPage("/index.html");
    }
}

/**
 * Log out current user and return to login page
 */
const logOut = () => {
    if (confirm("Are you sure you want to log out?")) {
        setCurrentUser(null);
        goToPage("/");
    }
}

const setInvoiceUserCreds = (element) => {
    const user = getCurrentUser();
    const date = new Date();
    element.innerHTML = `
    Nama                      : ${user.username}
    Tanggal                   : ${date.toDateString()}, ${date.toTimeString()}
    `;
}

const removeCartItem = (item) => {
    delete cart[item];
    setInvoiceTable();
}

const setInvoiceTable = () => {
    const listItems = document.getElementById("invoice-table-body");
    const spanTotalPrice = document.getElementById("invoice-total-price-total-price");
    const elementPpn = document.getElementById("invoice-total-price-ppn");
    const elementTotalPay = document.getElementById("invoice-total-price-total-pay");
    const elementPay = document.getElementById("span-all-total-price");

    if (listItems) {
        listItems.innerHTML = "";
        let total = 0;

        for (const key in cart) {
            const data = cart[key];

            const tr = document.createElement("tr");
            tr.setAttribute("id", `list-item-${data.nama}`);
            // <td class="text-align-left"><img src="gambarBaju/hitamAllstar.JPG" style="height: 50px;"></td>
            // <td class="text-align-left">${data.nama}</td>
            // <td class="text-align-right" id="qty-input"><input type="number" value="${data.qty}" /></td>
            // <td class="text-align-right">${stringifyHarga(data.harga)}</td>
            // <td class="text-align-right">Rp. ${stringifyHarga(currentTotal)}</td>
            // <td>
            //     <input type="button" value="🗑️">
            // </td>
            const currentTotal = data.harga * data.qty;
            tr.innerHTML = `
                        <td class="fz text-align-left">
                            <img src="gambarBaju/${data.namagambar}" style="height: 50px;">
                        </td>
                        <td class="fz text-align-left">${data.nama}</td>
                        <td class="text-align-right" id="qty-input">
                            <input type="number" min="1" max="${data.stock}" id="input-qty-${data.nama}" value="${data.qty}" />
                        </td>
                        <td class="fz text-align-right">Rp. ${stringifyHarga(data.harga)}</td>
                        <td class="fz text-align-right">Rp. ${stringifyHarga(currentTotal)}</td>
                        <td>
                            <input class="rm-button" type="button" id="rm-${data.nama}" value="🗑️">
                        </td>
            `;
            listItems.appendChild(tr);
            total += currentTotal;

            const inputQtyHandler = (event) => {
                cart[data.nama].qty = event.target.value;
                setInvoiceTable();
            };

            const elementInputQty = document.getElementById(`input-qty-${data.nama}`);

            elementInputQty.addEventListener("change", inputQtyHandler);

            document.getElementById(`rm-${data.nama}`).addEventListener("click", () => {
                removeCartItem(data.nama);
            });
        }

        const ppn = total * 0.1;
        const totalPay = stringifyHarga(total + ppn);
        spanTotalPrice.innerText = stringifyHarga(total);
        elementPpn.innerText = stringifyHarga(ppn);
        elementTotalPay.innerText = totalPay;
        elementPay.innerText = totalPay;
    }
}

const showProducts = (productsToShow) => {
    const elementTable = document.getElementsByClassName("product-table")[0];

    if (elementTable) {
        elementTable.innerHTML = "";
        for (let i = 0; i < productsToShow.length; i += 3) {
            const tr = document.createElement("tr");

            for (let j = i; j < (i + 3); j++) {
                if (j === productsToShow.length) {
                    break;
                }

                const data = productsToShow[j];

                const td = document.createElement("td");
                td.innerHTML += createProductCard(data);

                tr.appendChild(td);
            }

            elementTable.appendChild(tr);
        }
    }
}

const addToCart = (productData) => {
    const productName = productData.nama;

    if (!cart[productName]) {
        cart[productName] = { ...productData, qty: 0 };
    }

    cart[productName].qty++;
    const sisaStock = productData.stock - cart[productName].qty;

    if (sisaStock < 0) {
        cart[productName].qty--;
        return -1;
    }

    return sisaStock;
}

const loadProductsListener = (productsToListen) => {
    for (const data of productsToListen) {
        const elementAdd = document.getElementById(`product-add-${data.nama}`);
        const elementBuy = document.getElementById(`product-buy-${data.nama}`);

        if (elementAdd) elementAdd.addEventListener("click", () => {
            const sisaStock = addToCart(data);
            if (sisaStock < 0) {
                alert("Maaf, barang " + randomOutOfStockLine());
                return;
            }

            const description = document.getElementById(`product-desc-${data.nama}`);
            if (description) description.innerText = `Stok: ${sisaStock}`;
        });

        if (elementBuy) elementBuy.addEventListener("click", () => {
            const cartData = cart[data.nama];
            if (!cartData) {
                if (addToCart(data) < 0) {
                    alert("Maaf, barang " + randomOutOfStockLine());
                    return;
                }
            }

            goToPage("/invoice.html");
        });
    }
}

// const loadInvoiceButtonListeners = () => {
//     const buyButtons = document.getElementsByClassName("product-buy");
//     for (const button of buyButtons) {
//         button.addEventListener("click", () => {
//             goToPage("/invoice.html");
//         });
//     }
// }

const search = () => {
    const elementSearch = document.getElementById("text-input-search-products");
    if (elementSearch.value) {
        const filter = products.filter(product => product.nama.toLowerCase().includes(elementSearch.value.toLowerCase()));

        if (!filter.length) {
            alert("Maaf, barang yang anda cari " + randomOutOfStockLine());
            return;
        }

        showProducts(filter);
        loadProductsListener(filter);
    } else {
        showProducts(products);
        loadProductsListener(products);
    }
    // loadInvoiceButtonListeners();
}

parseUrlParam();

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

const toLoginButton = document.getElementById("login-nav-button");
if (toLoginButton) toLoginButton.addEventListener("click", () => {
    if (getCurrentUser()) {
        logOut();
        return;
    }

    goToPage("/login.html");
});

const homeNavButton = document.getElementById("home-nav-button");
if (homeNavButton) homeNavButton.addEventListener("click", () => {
    goToPage("/");
});

const berandaNavButton = document.getElementById("beranda-nav-button");
if (berandaNavButton) berandaNavButton.addEventListener("click", () => {
    goToPage("/index.html");
});

const invoiceNavButton = document.getElementById("invoice-nav-button");
if (invoiceNavButton) invoiceNavButton.addEventListener("click", () => {
    goToPage("/invoice.html");
});

if (window.location.pathname.startsWith("/")) {
    showProducts(products);
    loadProductsListener(products);
    // loadInvoiceButtonListeners();
}

const buttonSearch = document.getElementById("button-search-products");
if (buttonSearch) buttonSearch.addEventListener("click", search);

const invoiceUserCreds = document.getElementById("user-creds");
if (invoiceUserCreds) {
    setInvoiceUserCreds(invoiceUserCreds);
    setInvoiceTable();
}

const buttonPay = document.getElementById("button-pay-cart");
if (buttonPay) buttonPay.addEventListener("click", () => {
    if (!Object.keys(cart).length) {
        alert("Mau beli apa nih? Pilih-pilih dulu yuk!");
    } else {
        alert("Terimakasih telah berbelanja di BelanjaCuan <3");
        cart = {};
    }
    goToPage("/");
});

const elementALogo = document.getElementById("a-logo");
if (elementALogo) elementALogo.addEventListener("click", () => {
    goToPage("/");
});
