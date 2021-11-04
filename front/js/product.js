const title = document.getElementById("title");
const price = document.getElementById("price");
const description = document.getElementById("description");
const colors = document.getElementById("colors");

const image = document.getElementsByClassName("item__img")[0];

const addToCart = document.getElementById("addToCart");
const quantity = document.getElementById("quantity");

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

//Ajout au panier

addToCart.addEventListener("click", function (e) {
  e.preventDefault();

  // Vérification que la quantité est bien un nombre
  if (Number.isInteger(parseInt(quantity.value)) === false) {
    alert("Merci de renseigner un nombre de produits");
    return;
  }
  console.log("Item added ");

  var productJSON = {
    name: title.innerHTML,
    color: colors.options[colors.selectedIndex].text,
    quantity: quantity.value,
  };
  console.log(productJSON);
  console.log(productJSON.color);

  ///////////////// STORAGE

  if (localStorage.getObj("product") !== null) {
    //// Recherche produit identique

    // if (
    //   productArray.indexOf(productJSON.color) !== -1 &&
    //   productArray.indexOf(productJSON.name) !== -1
    // ) {
    //   productArray = localStorage.getObj("product");
    //   productArray.push(productJSON.quantity);
    //   localStorage.setObj("product", productArray);
    // } else {
    productArray = localStorage.getObj("product");
    productArray.push(productJSON);
    localStorage.setObj("product", productArray);
  } else {
    productArray.push(productJSON);
    localStorage.setObj("product", productArray);
  }
  console.log(productArray);
});

Storage.prototype.setObj = function (key, value) {
  this.setItem(key, JSON.stringify(value));
};

Storage.prototype.getObj = function (key) {
  var value = this.getItem(key);
  return value && JSON.parse(value);
};

// Vérification doublon objet

//All values stored in localStorage are strings.
//Grab our itemsline string from localStorage.
var stringFromLocalStorage = window.localStorage.getItem("itemsline");

//Then parse that string into an actual value.
var parsedValueFromString = JSON.parse(stringFromLocalStorage);

//If that value is null (meaning that we've never saved anything to that spot in localStorage before), use an empty array as our array. Otherwise, just stick with the value we've just parsed out.
var array = parsedValueFromString || [];

//Here's the value we want to add
var value = "some value";

//If our parsed/empty array doesn't already have this value in it...
if (array.indexOf(value) == -1) {
  //add the value to the array
  array.push(value);

  //turn the array WITH THE NEW VALUE IN IT into a string to prepare it to be stored in localStorage
  var stringRepresentingArray = JSON.stringify(array);

  //and store it in localStorage as "itemsline"
  window.localStorage.setItem("itemsline", stringRepresentingArray);
}
