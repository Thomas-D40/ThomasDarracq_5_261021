const cartItems = document.getElementById("cart__items");

// Fonction pour créer le corps de l'article dans la liste comme présenté dans l'HTML
function cartArticle(kanaps) {
  for (var i = 0; i < kanaps.length; i++) {
    // On créé les différents items de l'objet dans la liste
    var cartItem = document.createElement("article");
    cartItem.classList.add("cart__item");

    var cartItemImg = document.createElement("div");
    cartItemImg.classList.add("cart__item__img");

    var cartImg = document.createElement("img");

    var cartItemContent = document.createElement("div");
    cartItemContent.classList.add("cart__item__content");

    var cartItemContentTitlePrice = document.createElement("div");
    cartItemContentTitlePrice.classList.add("cart__item__content__titlePrice");

    var cartTitle = document.createElement("h2");

    var cartPrice = document.createElement("p");

    var cartItemContentSettings = document.createElement("div");
    cartItemContentSettings.classList.add("cart__item__content__settings");

    var cartItemContentSettingsQuantity = document.createElement("div");
    cartItemContentSettingsQuantity.classList.add(
      "cart__item__content__settings__quantity"
    );

    var cartQteText = document.createElement("p");

    var cartQte = document.createElement("input");
    cartQte.classList.add("itemQuantity");
    cartQte.setAttribute("name", "itemQuantity");
    cartQte.setAttribute("type", "number");
    cartQte.setAttribute("min", "1");
    cartQte.setAttribute("max", "100");

    var cartItemContentSettingsDelete = document.createElement("div");
    cartItemContentSettingsDelete.classList.add(
      "cart__item__content__settings__delete"
    );

    var cartDelete = document.createElement("p");
    cartDelete.classList.add("deleteItem");

    cartQteText.textContent = "Qté : ";
    cartDelete.textContent = "Supprimer";

    // On agence les items entre eux

    cartItems.appendChild(cartItem);

    cartItem.appendChild(cartItemImg);
    cartItem.appendChild(cartItemContent);

    cartItemImg.appendChild(cartImg);

    cartItemContent.appendChild(cartItemContentTitlePrice);
    cartItemContent.appendChild(cartItemContentSettings);

    cartItemContentTitlePrice.append(cartTitle);
    cartItemContentTitlePrice.append(cartPrice);

    cartItemContentSettings.appendChild(cartItemContentSettingsQuantity);
    cartItemContentSettings.appendChild(cartItemContentSettingsDelete);

    cartItemContentSettingsQuantity.appendChild(cartQteText);
    cartItemContentSettingsQuantity.appendChild(cartQte);

    cartItemContentSettingsDelete.append(cartDelete);

    // On injecte les données issues du local storage

    cartImg.src = kanaps[i].img;
    cartTitle.innerHTML = kanaps[i].nom + " - " + kanaps[i].color;
    cartPrice.innerHTML = kanaps[i].price + " €";
    cartQte.value = kanaps[i].quantity;

    cartItem.setAttribute("data-id", kanaps[i].id);
  }
}

//Methodes Traitement Information Storage
Storage.prototype.setObj = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObj = function (key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
};

// Récupération des données du local storage et stockage dans la variable productArray
let productArray = [];

if (localStorage.getObj("products") !== null) {
  productArray = localStorage.getObj("products");
}

// Intégration de la liste

cartArticle(productArray);

// Les totaux

const HTMLQuantity = document.getElementById("totalQuantity");
const HTMLPrice = document.getElementById("totalPrice");

let totalQuantity = 0;
let totalPrice = 0;
function total() {
  productArray.forEach(function (v) {
    let qteCart = parseInt(v.quantity, 10);
    let priceCart = parseInt(v.price, 10);
    totalQuantity += qteCart;
    totalPrice += qteCart * priceCart;
  });
  HTMLQuantity.innerHTML = totalQuantity;
  HTMLPrice.innerHTML = totalPrice;
}

total();

function updatePrice() {
  totalQuantity = 0;
  totalPrice = 0;
  total();
}

// Pouvoir modifier la quantité depuis le panier

// Création d'un array des éléments de la liste en fonction de leur index

let itemsQuantity = document.getElementsByClassName("itemQuantity");
let itemsQuantityArray = Array.from(itemsQuantity);
//

// Mise à jour info panier via leur index
function infoPanier(i) {
  itemsQuantityArray[i].addEventListener("change", () => {
    productArray[i].quantity = itemsQuantityArray[i].value;
    localStorage.setObj("products", productArray);
    updatePrice();
  });
}

for (var i = 0; i < itemsQuantityArray.length; i++) {
  infoPanier(i);
}

// Bouton Supprimer

let supprBtn = document.getElementsByClassName("deleteItem");
console.log(supprBtn);
let supprBtnArray = Array.from(supprBtn);

function suppr(i) {
  supprBtnArray[i].addEventListener("click", () => {
    // Mise à jour local storage
    productArray.splice(i, 1);
    localStorage.setObj("products", productArray);
    // Mise à jour du total
    updatePrice();
    // Suppression de l'article contenant le produit
    supprBtn[i].closest("article").remove();
  });
}

for (var i = 0; i < supprBtnArray.length; i++) {
  suppr(i);
}
