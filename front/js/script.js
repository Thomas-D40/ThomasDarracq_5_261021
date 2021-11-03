const items = document.getElementById("items");

fetch("http://localhost:3000/api/products")
  .then(function (res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function (kanaps) {
    for (var i = 0; i < kanaps.length; i++) {
      var kanapLink = document.createElement("a");
      var kanapArticle = document.createElement("article");
      var kanapPicture = document.createElement("img");
      var kanapTitle = document.createElement("h3");
      var kanapDescription = document.createElement("p");

      kanapLink.href = "./product.html?id=" + kanaps[i]._id;
      kanapPicture.src = kanaps[i].imageUrl;
      kanapTitle.innerHTML = kanaps[i].name;
      kanapDescription.innerHTML = kanaps[i].description;

      kanapLink.appendChild(kanapArticle);
      kanapArticle.appendChild(kanapPicture);
      kanapArticle.appendChild(kanapTitle);
      kanapArticle.appendChild(kanapDescription);

      items.appendChild(kanapLink);
    }
  });
