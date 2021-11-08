// <!-- <article class="cart__item" data-id="{product-ID}">
// <div class="cart__item__img">
//   <img src="../images/product01.jpg" alt="Photographie d'un canapé">
// </div>
// <div class="cart__item__content">
//   <div class="cart__item__content__titlePrice">
//     <h2>Nom du produit</h2>
//     <p>42,00 €</p>
//   </div>
//   <div class="cart__item__content__settings">
//     <div class="cart__item__content__settings__quantity">
//       <p>Qté : </p>
//       <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
//     </div>
//     <div class="cart__item__content__settings__delete">
//       <p class="deleteItem">Supprimer</p>
//     </div>
//   </div>
// </div>
// </article>

const cartItems = document.getElementById("cart__items");

function article() {
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

  var cartItemContentSettingsDelete = document.createElement("div");
  cartItemContentSettingsDelete.classList.add(
    "cart__item__content__settings__delete"
  );

  var cartDelete = document.createElement("p");
  cartDelete.classList.add("deleteItem");

  cartQteText.textContent = "Qté :";
  cartDelete.textContent = "Supprimer";

  cartItems.appendChild("cartItem");

  cartItem.appendChild("cartItemImg");
  cartItem.appendChild("cartItemContent");

  cartItemImg.appendChild("cartImg");

  cartItemContent.appendChild("cartItemContentTitlePrice");
  cartItemContent.appendChild("cartItemContentSettings");

  cartItemContentTitlePrice.append("cartTitle");
  cartItemContentTitlePrice.append("cartPrice");

  cartItemContentSettings.appendChild("cartItemContentSettingsQuantity");
  cartItemContentSettings.appendChild("cartItemContentSettingsDelete");

  cartItemContentSettingsQuantity.appendChild("cartQteText");
  cartItemContentSettingsQuantity.appendChild("cartQte");

  cartItemContentSettingsDelete.append("cartDelete");
}
