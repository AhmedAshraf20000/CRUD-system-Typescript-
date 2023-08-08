"use strict";
const productName = document.getElementById("name");
const productPrice = document.getElementById("price");
const productCategory = document.getElementById("category");
const productCondition = document.getElementById("condition");
const addBtn = document.getElementById("add");
const deleteAllBtn = document.getElementById("delete-all");
const updateBtn = document.getElementById("update");
const listHeader = document.getElementById("list-header");
const pageBody = document.querySelector("body");
var productsCounter = 0;
function handelAddProduct() {
    let productsArr = [];
    const storedProducts = localStorage.getItem("products");
    if (localStorage.length !== 0)
        productsArr = JSON.parse(storedProducts);
    addBtn.onclick = (e) => {
        e.preventDefault();
        if (productCategory.value === "none" || productCondition.value === "none")
            return false;
        else {
            productsCounter++;
            let productObj = {
                name: productName.value, price: +productPrice.value, category: productCategory.value, condition: productCondition.value
            };
            productsArr.push(productObj);
            localStorage.setItem("products", JSON.stringify(productsArr));
        }
        createProductsList(productsCounter);
    };
}
handelAddProduct();
function handelDeleteAll() {
    deleteAllBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.setItem("products", "");
        localStorage.clear();
        Array.from(document.getElementsByTagName("ul")).forEach((e) => e.remove());
        productsCounter = 0;
    };
}
handelDeleteAll();
function createProductsList(productsCounter) {
    if (localStorage.length !== 0) {
        listHeader.classList.remove("hidden");
        let productsArr = [];
        const storedProducts = localStorage.getItem("products");
        if (localStorage.length !== 0)
            productsArr = JSON.parse(storedProducts);
        let productList = document.createElement("ul");
        productList.classList.add("product");
        for (let j = 0; j < 6; j++) {
            if (j === 0) {
                let li = document.createElement("li");
                li.innerHTML = `${productsCounter}`;
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
                deleteIcon.onclick = () => handleDeleteSingleProduct(productList, productsArr, productsCounter);
                productList.appendChild(li);
            }
            else {
                let li = document.createElement("li");
                let key = Object.keys(productsArr[productsCounter - 1])[j - 1];
                li.innerHTML = `${productsArr[productsCounter - 1][key]}`;
                productList.appendChild(li);
            }
        }
        pageBody.appendChild(productList);
    }
}
function handleDeleteSingleProduct(productList, productsArr, i) {
    productsCounter--;
    productList.remove();
    productsArr.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(productsArr));
}
