// Заголовок
let title = document.createElement("h1");
title.textContent = "Список покупок";
title.classList.add("title");

// функция создания кнопки
function btn(text, classList) {
  let button = document.createElement("button");
  button.classList = classList;
  button.textContent = text;
  return button;
}

// функция создания поля ввода
function input(type, placeholder) {
  let input = document.createElement("input");
  input.placeholder = placeholder;
  input.type = type;
  return input;
}

// Поля ввода нового продукта
let inputField = document.createElement("div");
inputField.classList.add("input__box");

let inputProduct = input("text", "Название товара");
inputProduct.classList.add("input__field--product", "input__field");

let inputQuantity = input("number", "Количество товара");
inputQuantity.classList.add("input__field--quantity", "input__field");

let inputPrice = input("number", "Цена");
inputPrice.classList.add("input__field--price", "input__field");

let addProductBtn = btn("Добавить", "add-btn");
addProductBtn.classList.add("btn");

inputField.append(inputProduct, inputQuantity, inputPrice, addProductBtn);

//делаем ввод количства и цены с помошью прокрутки колеса мыши
inputQuantity.addEventListener("wheel", inputWheel);
inputPrice.addEventListener("wheel", inputWheel);

function inputWheel(event) {
  event.preventDefault();
  const step = this.getAttribute("step") ? +this.getAttribute("step") : 1;
  event.deltaY < 0
    ? (this.value = +this.value + step)
    : (this.value = +this.value - step);
}

// итоговая стоимость
let totalPriceWrapper = document.createElement("div");
totalPriceWrapper.classList.add("total-price-wrapper");
let totalPrice = document.createElement("strong");
totalPrice.classList.add("total-price");
totalPriceWrapper.append(totalPrice);

// Список покупок
let list = document.createElement("ul");
list.classList.add("product__list");
list.innerHTML = "";

export {
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
};
