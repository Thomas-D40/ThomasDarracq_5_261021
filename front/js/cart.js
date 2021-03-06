const cartItems = document.getElementById("cart__items");

let url = new URL(window.location.href);
let productArray = [];

//Methodes Traitement Information Storage
Storage.prototype.setObj = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObj = function (key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
};

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

// Récupération des données du local storage et stockage dans la variable productArray

if (localStorage.getObj("products") !== null) {
  productArray = localStorage.getObj("products");
}

// Via l'URL, on s'assure que cette partie du script ne s'applique que sur la page panier
if (url == "http://127.0.0.1:5500/front/html/cart.html") {
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
      if (itemsQuantityArray[i].value == 0) {
        alert(
          "Veuillez cliquer directement sur supprimer ou utilisez uniquement des chiffres pour les quantités"
        );
      } else {
        productArray[i].quantity = itemsQuantityArray[i].value;
        localStorage.setObj("products", productArray);
        updatePrice();
      }
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

  // Récupération des éléments du formulaire

  const firstName = document.getElementById("firstName");

  const lastName = document.getElementById("lastName");

  const address = document.getElementById("address");

  const city = document.getElementById("city");

  const email = document.getElementById("email");
  const emailErrorMsg = document.getElementById("emailErrorMsg");

  const order = document.getElementById("order");

  // Règles regex

  let formRegexName = /^[a-zA-Z ,.'-]*$/i;

  let formRegexAdress = /^[a-zA-Z0-9\s,'-]*$/;

  let formRegexEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

  // On récupère les inputs du formulaire
  let inputNodeList = document.querySelectorAll("div.cart__order div > input");

  // On retire les deux derniers qui sont le mail (gestion différente) et le bouton de validation
  let inputArray = Array.from(inputNodeList);
  inputArray.splice(4, 2);

  // Si erreur de saisie, on le notifie

  function inputListener(j) {
    inputArray[j].addEventListener("change", () => {
      // On applique un premier regex pour nom et prénom
      if (j <= 1) {
        if (formRegexName.test(inputArray[j].value) == false) {
          inputArray[j].nextElementSibling.innerHTML =
            "Vous ne pouvez utiliser que des lettres";
          order.disabled = true;
        } else {
          inputArray[j].nextElementSibling.innerHTML = "";
          order.disabled = false;
        }
      } else {
        // Un autre pour les adresses en tolérant les chiffres
        if (formRegexAdress.test(inputArray[j].value) == false) {
          inputArray[j].nextElementSibling.innerHTML =
            "Ceci n'est pas une adresse valide";
          order.disabled = true;
        } else {
          inputArray[j].nextElementSibling.innerHTML = "";
          order.disabled = false;
        }
      }
    });
  }

  // On applique la dernière fonction à l'ensemble des inputs
  for (var j = 0; j < inputArray.length; j++) {
    inputListener(j);
  }

  // Le mail nécessite un regex différent

  email.addEventListener("change", () => {
    if (formRegexEmail.test(email.value) == false) {
      emailErrorMsg.innerHTML = "Ceci n'est pas un email valide";
      order.disabled = true;
    } else {
      emailErrorMsg.innerHTML = "";
      order.disabled = false;
    }
  });

  // Préparation de la commande

  // Génération à venir du tableau des produits

  let products = [];
  function productsOrdered() {
    for (let i = 0; i < productArray.length; i++) {
      products.push(productArray[i].id);
    }
  }

  // Génération de la fiche de contact pour envoi API
  function Request(a, b) {
    this.contact = a;
    this.products = b;
  }

  function Contact(f, l, a, c, e) {
    this.firstName = f.value;
    this.lastName = l.value;
    this.address = a.value;
    this.city = c.value;
    this.email = e.value;
  }

  let utilisateur = "";
  let jsonBody = "";

  function envoyer() {
    fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(jsonBody),
    })
      .then(function (res) {
        if (res.ok) {
          return res.json();
        }
      })
      // Transfert vers page de confirmation
      .then(function (a) {
        document.location.href = "./confirmation.html?orderId=" + a.orderId;
      })
      .catch((err) => console.log("Oh no", err));
  }

  order.addEventListener("click", (e) => {
    if (productArray == 0) {
      alert("Merci de compléter votre panier pour passer votre commande");
    } else {
      e.preventDefault();
      utilisateur = new Contact(firstName, lastName, address, city, email);
      productsOrdered();
      jsonBody = new Request(utilisateur, products);
      envoyer();
      localStorage.clear();
    }
  });
}

// Insertion du numéro de commande

let urlString = url.toString();

if (
  urlString.startsWith("http://127.0.0.1:5500/front/html/confirmation.html")
) {
  let orderIdText = document.getElementById("orderId");
  orderId = url.searchParams.get("orderId");
  orderIdText.innerHTML = orderId;
}
