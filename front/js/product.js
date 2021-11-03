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

addToCart.addEventListener("click", function () {
  var objJson = {
    name: title.innerHTML,
    color: colors.options[colors.selectedIndex].text,
    quantity: quantity.value,
  };
  let objLinea = JSON.stringify(objJson);
  localStorage.setItem("obj", objLinea);
  console.log(objLinea);
  console.log(localStorage.length);
  console.log(objJson);
});
