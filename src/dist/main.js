"use strict";
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productSearch = document.getElementById("search");
const productCategory = document.getElementById("category");
const productCondition = document.getElementById("condition");
const addBtn = document.getElementById("add");
const deleteAllBtn = document.getElementById("delete-all");
const updateBtn = document.getElementById("update");
const listHeader = document.getElementById("list-header");
const pageBody = document.querySelector("body");
var productsCounter = 0;
var productsArr = [];
var filteredProductsArr = [];
const storedProducts = localStorage.getItem("products");
if (localStorage.length !== 0)
    productsArr = JSON.parse(storedProducts);
function showProductsList(filteredProductsArr) {
    Array.from(document.getElementsByTagName("ul")).forEach((e) => e.id !== "list-header" ? e.remove() : "");
    if (localStorage.length !== 0) {
        listHeader.classList.remove("hidden");
        for (let i = 0; i < (filteredProductsArr.length === 0 ? productsArr.length : filteredProductsArr.length); i++) {
            let productList = document.createElement("ul");
            productList.classList.add("product");
            for (let j = 0; j < 6; j++) {
                if (j === 0) {
                    let li = document.createElement("li");
                    li.innerHTML = `${i + 1}`;
                    productList.appendChild(li);
                }
                else if (j === 5) {
                    let li = document.createElement("li");
                    li.classList.add("action");
                    let updateIcon = document.createElement("i");
                    updateIcon.classList.add("fa-solid", "fa-pen");
                    let deleteIcon = document.createElement("i");
                    deleteIcon.classList.add("fa-solid", "fa-trash");
                    li.append(updateIcon, deleteIcon);
                    deleteIcon.onclick = () => handleDeleteSingleProduct(productList, i);
                    updateIcon.onclick = () => handelUpdateProduct(i);
                    productList.appendChild(li);
                }
                else {
                    let li = document.createElement("li");
                    let key = Object.keys(filteredProductsArr.length === 0 ? productsArr[i] : filteredProductsArr[i])[j - 1];
                    li.innerHTML = `${filteredProductsArr.length === 0 ? productsArr[i][key] : filteredProductsArr[i][key]}`;
                    productList.appendChild(li);
                }
            }
            pageBody.appendChild(productList);
        }
    }
}
showProductsList(filteredProductsArr);
function handelAddProduct() {
    addBtn.onclick = (e) => {
        e.preventDefault();
        if (productCategory.value === "none" || productCondition.value === "none")
            return false;
        else {
            let productObj = {
                name: productName.value, price: +productPrice.value, category: productCategory.value, condition: productCondition.value
            };
            productsArr.push(productObj);
            localStorage.setItem("products", JSON.stringify(productsArr));
        }
        showProductsList(filteredProductsArr);
    };
}
handelAddProduct();
function handelDeleteAll() {
    deleteAllBtn.onclick = (e) => {
        e.preventDefault();
        productsArr.length = 0;
        localStorage.clear();
        showProductsList(filteredProductsArr);
    };
}
handelDeleteAll();
function handleDeleteSingleProduct(productList, i) {
    productList.remove();
    productsArr.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(productsArr));
    showProductsList(filteredProductsArr);
}
function handelUpdateProduct(i) {
    productName.value = productsArr[i].name;
    productPrice.value = productsArr[i].price;
    productCategory.value = productsArr[i].category;
    productCondition.value = productsArr[i].condition;
    updateBtn.classList.remove("hidden");
    updateBtn.onclick = (e) => {
        e.preventDefault();
        productsArr[i].name = productName.value;
        productsArr[i].price = productPrice.value;
        productsArr[i].category = productCategory.value;
        productsArr[i].condition = productCondition.value;
        showProductsList(filteredProductsArr);
        updateBtn.classList.add("hidden");
    };
}
productSearch.oninput = () => {
    filteredProductsArr = productsArr.filter((e) => e.name.startsWith(productSearch.value.toLowerCase()));
    showProductsList(filteredProductsArr);
};
