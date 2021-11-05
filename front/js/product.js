const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");

const image = document.getElementsByClassName("item__img")[0];

const addToCart = document.getElementById("addToCart");
const quantity = document.getElementById("quantity");

// Récupération de l'ID
let url = new URL(window.location.href);
let id = url.searchParams.get("id");
console.log(id);

// Affichage produit

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (kanaps) {
    for (let i = 0; i < kanaps.length; i++) {
      if (kanaps[i]._id == id) {
        console.log(kanaps[i]._id);
        title.innerHTML = kanaps[i].name;
        price.innerHTML = kanaps[i].price;
        description.innerHTML = kanaps[i].description;

        console.log(kanaps[i].colors);

        let options = [];
        for (let j = 0; j < kanaps[i].colors.length; j++) {
          options.push(kanaps[i].colors[j]);
        }
        options.forEach(function (element, key) {
          colors[key] = new Option(element, key);
        });

        console.log(colors);

        var picture = document.createElement("img");
        picture.src = kanaps[i].imageUrl;
        console.log(picture.src);
        image.appendChild(picture);
      }
    }
  });

// Création du panier

var productArray = [];

//Methodes Traitement Information Storage
Storage.prototype.setObj = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObj = function (key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
};

//Ajout au panier

addToCart.addEventListener("click", function (e) {
  e.preventDefault();

  // Vérification que la quantité est bien un nombre
  if (Number.isInteger(parseInt(quantity.value)) === false) {
    alert("Merci de renseigner un nombre de produits");
    return;
  }
  console.log("Item added ");

  //Mise en place variable pour comparaison avec articles déjà présents

  var color = colors.options[colors.selectedIndex].text;
  var qte = quantity.value;

  // Vérification si article déjà présent

  var productJSON = {
    id: id,
    color: color,
    quantity: qte,
  };

  ///////////////// STORAGE

  // Fonction générique pour push

  //Vérif existance du local storage
  if (localStorage.getObj("products") !== null) {
    productArray = localStorage.getObj("products");

    // Création d'une variable permettant de vérifier si l'item est déjà présent

    let isNew = true;
    productArray.forEach(function (v) {
      if (v.id == id && v.color == color) {
        isNew = false;
        console.log(typeof qte);
        let qteCart = parseInt(v.quantity, 10);
        let qteAdded = parseInt(qte, 10);
        console.log(qteCart);
        qteCart += qteAdded;
        console.log(qteCart);
      }
    });
    console.log(isNew);

    if (isNew == true) {
      productArray.push(productJSON);
    }
    localStorage.setObj("products", productArray);
  } else {
    productArray.push(productJSON);
    localStorage.setObj("products", productArray);
  }

  console.log(productArray);
  console.log(productArray[0].id);
});
// Fusion doublon
