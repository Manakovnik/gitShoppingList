import {
  title,
  inputField,
  inputProduct,
  inputQuantity,
  inputPrice,
  addProductBtn,
  totalPriceWrapper,
  totalPrice,
  list,
  btn,
  input,
  inputWheel,
} from "./elements.js";

import { getList, saveList } from "./local-storage.js";

// массивы для хранения данных
let productsArray = [];
let quantityArray = [];
let priceArrey = [];
let totalPriceArrey = [];

// проверяем хранилище на наличие информации
function checkLocalStorage() {
  productsArray = [...getList("product-list")]; // если в LocalStorage что-то хранится - добавляем это в массивы
  quantityArray = [...getList("quantity-list")];
  priceArrey = [...getList("price-list")];
}
checkLocalStorage();

let index = 1;

//функция измениения текста кнопки при мобильном размере экрана
function checkWindowWidth(screenSize, button, text) {
  if (window.innerWidth < screenSize) {
    button.textContent = text;
  }
}

checkWindowWidth(620, addProductBtn, "+");

// Создаем новый элемент списка
function getNewProduct(index, product, quantity, price) {
  let productItem = document.createElement("li");
  productItem.classList.add("product__item");

  // номер продукта
  let productNumber = document.createElement("span");
  productNumber.classList.add("product__number");
  productNumber.textContent = index + 1;

  // название продукта
  let productTitleBox = document.createElement("div");
  productTitleBox.classList.add("product__title", "product__item--box");

  let productTitleCaption = document.createElement("span");
  productTitleCaption.classList.add("product__title--caption", "caption");
  productTitleCaption.textContent = "Название";

  let productTitle = document.createElement("strong");
  productTitle.classList.add("product__title--product", "descr");
  productTitle.textContent = product;

  productTitleBox.append(productTitleCaption, productTitle);

  // количество продукта
  let quantityBox = document.createElement("div");
  quantityBox.classList.add("product__quantity", "product__item--box");

  let quantityCaption = document.createElement("span");
  quantityCaption.classList.add("product__quantity--caption", "caption");
  quantityCaption.textContent = "Количество";

  let quantityProduct = document.createElement("strong");
  quantityProduct.classList.add("product__quantity--amount", "descr");
  quantityProduct.textContent = quantity;

  quantityBox.append(quantityCaption, quantityProduct);

  // Цена
  let priceBox = document.createElement("div");
  priceBox.classList.add("product__price", "product__item--box");

  let priceCaption = document.createElement("span");
  priceCaption.classList.add("product__price--caption", "caption");
  priceCaption.textContent = "Цена";

  let priceProduct = document.createElement("strong");
  priceProduct.classList.add("product__price--amount", "descr");
  priceProduct.textContent = price;

  priceBox.append(priceCaption, priceProduct);

  // Стоимость
  let totalPriceBox = document.createElement("div");
  totalPriceBox.classList.add("product__total-price", "product__item--box");

  let totalPriceCaption = document.createElement("span");
  totalPriceCaption.classList.add("product__total-price--caption", "caption");
  totalPriceCaption.textContent = "Стоимость";

  let totalPrice = document.createElement("strong");
  totalPrice.classList.add("product__total-price--amount", "descr");
  totalPrice.textContent = `${price * quantity}`;

  totalPriceBox.append(totalPriceCaption, totalPrice);

  //Блок редактирования
  let editBox = document.createElement("div");
  editBox.classList.add("product__edit");

  // Кнопка изменить
  let changeBtn = btn("Изменить", "change-btn");
  changeBtn.classList.add("btn");

  checkWindowWidth(768, changeBtn, "+");

  // Кнопка удалить
  let deleteBtn = btn("Удалить", "delete-btn");
  deleteBtn.classList.add("btn");
  editBox.append(changeBtn, deleteBtn);

  checkWindowWidth(768, deleteBtn, "X");

  // Изменить товар
  changeBtn.onclick = () => {
    let productTitle = prompt("Введите название", product);
    let productQuantity = Number(prompt("Введите количество", quantity));
    let productPrice = Number(prompt("Введите цену", price));

    productsArray[index] = productTitle;
    quantityArray[index] = productQuantity;
    priceArrey[index] = productPrice;
    totalPriceArrey[index] = productQuantity * productPrice;

    saveList("product-list", productsArray);
    saveList("quantity-list", quantityArray);
    saveList("price-list", priceArrey);

    render(productsArray, quantityArray, priceArrey);
  };

  // удалить товар
  deleteBtn.onclick = () => {
    if (confirm(`Вы уверены что хотите удалить товар ${product}?`)) {
      productsArray.splice(index, 1);
      quantityArray.splice(index, 1);
      priceArrey.splice(index, 1);
      totalPriceArrey.splice(index, 1);

      saveList("product-list", productsArray);
      saveList("quantity-list", quantityArray);
      saveList("price-list", priceArrey);

      render(productsArray, quantityArray, priceArrey);
    }
  };

  productItem.append(
    productNumber,
    productTitleBox,
    quantityBox,
    priceBox,
    totalPriceBox,
    editBox
  );
  list.append(productItem);
  return productItem;
}

// Добавить товар
addProductBtn.onclick = function () {
  productsArray.push(inputProduct.value);
  quantityArray.push(inputQuantity.value);
  priceArrey.push(inputPrice.value);
  totalPriceArrey.push(inputQuantity.value * inputPrice.value);

  inputProduct.value = "";
  inputQuantity.value = "";
  inputPrice.value = "";

  saveList("product-list", productsArray);
  saveList("quantity-list", quantityArray);
  saveList("price-list", priceArrey);

  render(productsArray, quantityArray, priceArrey);
};

// Функция отрисовки списка
function render(ar, arr, arrey) {
  list.innerHTML = ""; // Очищаем список перед отрисовкой

  // Начинаем отрисовку, используя массив и цикл
  for (let i = 0; i < arr.length; i++) {
    let productItem = getNewProduct(i, ar[i], arr[i], arrey[i]); // Создаем элемент списка
    list.append(productItem);
  }

  // Сумма всех покупок
  function arreySum(arrey) {
    let sum = 0;
    for (let i = 0; i < arrey.length; i++) {
      sum += arrey[i];
    }
    return sum;
  }

  // итоговая стоимость
  for (let i = 0; i < quantityArray.length; i++) {
    totalPriceArrey[i] = quantityArray[i] * priceArrey[i];
  }

  let totalSum = arreySum(totalPriceArrey);
  totalPrice.textContent = `Итоговая стоимость:  ${totalSum} р.`;
}

// Запускаем отрисовку списка при загрузке страницы
render(productsArray, quantityArray, priceArrey);

document.body.append(title, inputField, list, totalPriceWrapper);
