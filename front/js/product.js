// Variable pour mise en place des éléments sur la page

const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");
const image = document.getElementsByClassName("item__img")[0];

// Variable pour la gestion du panier

const addToCart = document.getElementById("addToCart");
const quantity = document.getElementById("quantity");

// Création d'une variable pour stocker la source de l'image pour injection dans localStorage

let imgSrc = "";

// Récupération de l'ID
let url = new URL(window.location.href);
let id = url.searchParams.get("id");

// Affichage produit

function cartContent(kanaps) {
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
      imgSrc = kanaps[i].imageUrl;
      image.appendChild(picture);
    }
  }
}

//Récupération des données de l'API au format JSON
const retrieveData = () => {
  fetch("http://localhost:3000/api/products")
    .then(function (res) {
      if (res.ok) {
        console.log(res.json);
        return res.json();
      }
    })
    .then((data) => cartContent(data))
    .catch((err) => console.log("Oh no", err));
  // Sur la base de l'API, on recherche le produit correspondant à la page pour injecter les informations dans le HTML
};

retrieveData();

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

function updateCart(v) {
  // Si déjà présent, on passe isNew en faux et on procède au changement de quantité
  if (v.id == id && v.color == color) {
    isNew = false;
    // Qte et v.quantity étant des strings, on les transforme en nombre pour procéder à l'addition
    console.log(typeof qte);
    let qteCart = parseInt(v.quantity, 10);
    let qteAdded = parseInt(qte, 10);
    qteCart += qteAdded;

    //On mets à jour le prix total sur cet article
    total = qteCart * parseInt(prix, 10);
    console.log(typeof v.total);

    // Réintégration nouvelle donnée dans v.quantity et v.total sous la forme de string pour dépôt dans le LocalStorage
    v.total = JSON.stringify(total);
    v.quantity = JSON.stringify(qteCart);
  }
}

addToCart.addEventListener("click", function (e) {
  e.preventDefault();

  // Vérification que la quantité est bien un nombre
  if (Number.isInteger(parseInt(quantity.value)) === false) {
    alert("Merci de renseigner un nombre de produits");
    return;
  }

  //Mise en place variable pour comparaison avec articles déjà présents

  var color = colors.options[colors.selectedIndex].text;
  var qte = quantity.value;
  var prix = price.innerHTML;
  var total = parseInt(qte, 10) * parseInt(prix, 10);

  var ProductJSON = {
    id: id,
    nom: title.innerHTML,
    color: color,
    price: prix,
    quantity: qte,
    total: total,
    img: imgSrc,
  };

  ///////////////// STORAGE

  // La quantité doit nécessairement être supérieure à 0 pour être ajouté au panier

  if (qte > 0) {
    if (localStorage.getObj("products") !== null) {
      productArray = localStorage.getObj("products");

      // Création d'une variable permettant de vérifier si l'item est déjà présent
      let isNew = true;
      productArray.forEach(function (v) {
        // Si déjà présent, on passe isNew en faux et on procède au changement de quantité
        if (v.id == id && v.color == color) {
          isNew = false;
          // Qte et v.quantity étant des strings, on les transforme en nombre pour procéder à l'addition
          console.log(typeof qte);
          let qteCart = parseInt(v.quantity, 10);
          let qteAdded = parseInt(qte, 10);
          qteCart += qteAdded;

          //On mets à jour le prix total sur cet article
          total = qteCart * parseInt(prix, 10);
          console.log(typeof v.total);

          // Réintégration nouvelle donnée dans v.quantity et v.total sous la forme de string pour dépôt dans le LocalStorage
          v.total = JSON.stringify(total);
          v.quantity = JSON.stringify(qteCart);
        }
      });

      // Si isNew est toujours true, alors on peut procéder à l'ajout de l'article
      if (isNew == true) {
        productArray.push(ProductJSON);
      }

      // On peut désormais renvoyer les données dans le localstorage
      localStorage.setObj("products", productArray);
    } else {
      productArray.push(ProductJSON);
      localStorage.setObj("products", productArray);
    }
  }
});
