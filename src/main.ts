const productName = <HTMLInputElement>document.getElementById("name");
const productPrice = <HTMLInputElement>document.getElementById("price");
const productCategory = <HTMLSelectElement>document.getElementById("category");
const productCondition = <HTMLInputElement>document.getElementById("condition");
const addBtn = <HTMLButtonElement>document.getElementById("add");
const deleteAllBtn = <HTMLButtonElement>document.getElementById("delete-all");
const updateBtn = <HTMLButtonElement>document.getElementById("update");
const listHeader = <HTMLUListElement>document.getElementById("list-header");
const pageBody = <HTMLBodyElement>document.querySelector("body");

var productsCounter: number = 0;

function handelAddProduct() {
    let productsArr: object[] = [];
    const storedProducts = localStorage.getItem("products") as string;
    if (localStorage.length !== 0) productsArr = JSON.parse(storedProducts);
    addBtn.onclick = (e) => {
        e.preventDefault();
        if (productCategory.value === "none" || productCondition.value === "none") return false;
        else {
            productsCounter++;
            let productObj: { name: string, price: number, category: string, condition: string } = {
                name: productName.value, price: +productPrice.value, category: productCategory.value, condition: productCondition.value
            };
            productsArr.push(productObj);
            localStorage.setItem("products", JSON.stringify(productsArr));
        }
        createProductsList(productsCounter);
    }
}
handelAddProduct();

function handelDeleteAll() {
    deleteAllBtn.onclick = (e) => {
        e.preventDefault();
        localStorage.setItem("products", "");
        localStorage.clear();
        Array.from(document.getElementsByTagName("ul")).forEach((e) => e.remove());
        productsCounter=0;
    }
}
handelDeleteAll()

function createProductsList(productsCounter: number) {
    if (localStorage.length !== 0) {
        listHeader.classList.remove("hidden");
        let productsArr: any[] = [];
        const storedProducts = localStorage.getItem("products") as string;
        if (localStorage.length !== 0) productsArr = JSON.parse(storedProducts);
        let productList = <HTMLUListElement>document.createElement("ul");
        productList.classList.add("product");
        for (let j = 0; j < 6; j++) {
            if (j === 0) {
                let li = <HTMLLIElement>document.createElement("li");
                li.innerHTML = `${productsCounter}`;
                productList.appendChild(li);
            }
            else if (j === 5) {
                let li = <HTMLLIElement>document.createElement("li");
                li.classList.add("action");
                let updateIcon = <HTMLElement>document.createElement("i");
                updateIcon.classList.add("fa-solid", "fa-pen");
                let deleteIcon = <HTMLElement>document.createElement("i");
                deleteIcon.classList.add("fa-solid", "fa-trash");
                li.append(updateIcon, deleteIcon);
                deleteIcon.onclick = () => handleDeleteSingleProduct(productList, productsArr, productsCounter);
                productList.appendChild(li);
            }
            else {
                let li = <HTMLLIElement>document.createElement("li");
                let key = Object.keys(productsArr[productsCounter - 1])[j - 1];
                li.innerHTML = `${productsArr[productsCounter - 1][key]}`;
                productList.appendChild(li);
            }
        }
        pageBody.appendChild(productList);

    }
}


function handleDeleteSingleProduct(productList: HTMLUListElement, productsArr: any[], i: number) {
    productsCounter--;
    productList.remove();
    productsArr.splice(i, 1);
    localStorage.setItem("products", JSON.stringify(productsArr));
}