// Load vinyl items and cart items on page load
window.onload = function () {
  loadVinyls();
  loadCartItems();
};
var slideIndex = 0;

showSlide(slideIndex);

function prevSlide() {
  showSlide((slideIndex -= 1));
}

function nextSlide() {
  showSlide((slideIndex += 1));
}

function showSlide(index) {
  var slides = document.getElementsByClassName("slide");
  if (index >= slides.length) {
    slideIndex = 0;
  } else if (index < 0) {
    slideIndex = slides.length - 1;
  }

  for (var i = 0; i < slides.length; i++) {
    slides[i].style.transform = "translateX(" + -100 * slideIndex + "%)";
  }
}

// Para produtos

// Variable to store the number of items in the cart
let cartItemCount = 0;

// Function to load vinyl items from the server
function loadVinyls() {
  fetch("http://localhost:4242/api/products")
    .then((response) => response.json())
    .then((data) => {
      const vinylContainer = document.querySelector(".vinyl");
      vinylContainer.innerHTML = "";
      data.forEach((release) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        const productImage = document.createElement("div");
        productImage.classList.add("product-image");
        const image = document.createElement("img");
        image.src = release.imageUrl;
        image.alt = "Product Image";
        productImage.appendChild(image);
        productCard.appendChild(productImage);

        const productDetails = document.createElement("div");
        productDetails.classList.add("product-details");

        const title = document.createElement("h3");
        title.classList.add("title");
        title.textContent = release.title;
        productDetails.appendChild(title);

        const artist = document.createElement("p");
        artist.classList.add("artist");
        artist.textContent = release.artist;
        productDetails.appendChild(artist);

        const genre = document.createElement("p");
        genre.classList.add("genre");
        genre.textContent = release.genre;
        productDetails.appendChild(genre);

        const priceContainer = document.createElement("div");
        priceContainer.classList.add("price-container");

        const price = document.createElement("p");
        price.classList.add("price");
        price.textContent = release.price.toFixed(2) + " €";
        priceContainer.appendChild(price);

        const cartButton = document.createElement("button");
        cartButton.classList.add("cart-button");
        const cartIcon = document.createElement("i");
        cartIcon.classList.add("fas", "fa-shopping-cart");
        cartButton.appendChild(cartIcon);
        priceContainer.appendChild(cartButton);

        productDetails.appendChild(priceContainer);
        productCard.appendChild(productDetails);
        vinylContainer.appendChild(productCard);

        // Add event listener to cart button
        cartButton.addEventListener("click", () => {
          addToCart(release);
        });
      });
    })
    .catch((error) => {
      console.error("Error loading featured releases:", error);
    });
}

// Function to add an item to the cart
function addToCart(vinyl) {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.id;
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/cart-items/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
}})
    .then((response) => response.json())
    .then((data) => {
      const existingCartItem = data.find(
        (item) => item.product_id === vinyl.id
      );
      if (existingCartItem) {
        const updatedQuantity = existingCartItem.quantity + 1;
        updateCartItemQuantity(existingCartItem.id, updatedQuantity);
      } else {
        fetch("http://localhost:4242/api/cart-items", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            user_id: userId,
            product_id: vinyl.id,
            quantity: 1,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Item added to cart:", data);
            loadCartItems();
          })
          .catch((error) => {
            console.error("Error adding item to cart:", error);
          });
      }
    })
    .catch((error) => {
      console.error("Error loading cart items:", error);
    });
}

function loadCartItems() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.id;
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/cart-items/${userId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"  ,
      authorization: `Bearer ${token}`,
    }
  })
    .then((response) => response.json())
    .then((data) => {
      const cartItemContainer = document.getElementById("cart-item");
      cartItemContainer.innerHTML = "";

      let totalPrice = 0; // Variable to calculate total price

      data.forEach((cartItem) => {
        fetch(`http://localhost:4242/api/products/${cartItem.product_id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json"  ,
            authorization: `Bearer ${token}`,
          }
        })
          .then((response) => response.json())
          .then((product) => {
            const cartItemDiv = document.createElement("div");
            cartItemDiv.classList.add("cart-item");
            cartItemDiv.setAttribute("data-product-id", product.id);

            const productImage = document.createElement("img");
            productImage.src = product.imageUrl;
            productImage.alt = "Product Image";
            productImage.classList.add("cart-item-image");
            cartItemDiv.appendChild(productImage);

            const productInfoDiv = document.createElement("div");
            productInfoDiv.classList.add("cart-item-info");

            const productName = document.createElement("h4");
            productName.textContent = product.title;
            productInfoDiv.appendChild(productName);

            const artistName = document.createElement("p");
            artistName.textContent = "Artist: " + product.artist;
            productInfoDiv.appendChild(artistName);

            const genre = document.createElement("p");
            genre.textContent = "Genre: " + product.genre;
            productInfoDiv.appendChild(genre);

            const price = document.createElement("p");
            const productPrice = product.price.toFixed(2);
            price.textContent = "Price: " + productPrice + " EUR";
            productInfoDiv.appendChild(price);

            const quantityInput = document.createElement("input");
            quantityInput.type = "number";
            quantityInput.value = cartItem.quantity;
            quantityInput.classList.add("quantity-input");
            quantityInput.addEventListener("change", (event) =>
              updateQuantity(cartItem.id, event.target.value)
            );
            productInfoDiv.appendChild(quantityInput);

            const deleteButton = document.createElement("button");
            deleteButton.classList.add("delete-button");
            deleteButton.innerHTML = "&#10006;";
            deleteButton.addEventListener("click", () =>
              deleteCartItem(cartItem.id)
            );
            productInfoDiv.appendChild(deleteButton);

            cartItemDiv.appendChild(productInfoDiv);

            cartItemContainer.appendChild(cartItemDiv);

            // Calculate and update the total price
            totalPrice += productPrice * cartItem.quantity;
            document.getElementById("cart-total").textContent =
              "Total: " + totalPrice.toFixed(2) + " EUR";
          })
          .catch((error) => {
            console.error("Error loading product:", error);
          });
      });
    })
    .catch((error) => {
      console.error("Error loading cart items:", error);
    });
}

function updateQuantity(itemId, newQuantity) {
  if (newQuantity >= 1) {
    updateCartItemQuantity(itemId, newQuantity);
  }
}

function updateCartItemQuantity(itemId, newQuantity) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/cart-items/${itemId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"  ,
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      quantity: newQuantity,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Item quantity updated:", data);
      loadCartItems();
    })
    .catch((error) => {
      console.error("Error updating item quantity:", error);
    });
}

function deleteCartItem(itemId) {
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/cart-items/${itemId}`, {
    method: "DELETE", headers: {
      "Content-Type": "application/json"  ,
      authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      console.log("Item deleted:", itemId);
      loadCartItems();
    })
    .catch((error) => {
      console.error("Error deleting item:", error);
    });
}

function checkout() {
  const userData = JSON.parse(localStorage.getItem("user"));
  const userId = userData.id;
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  fetch(`http://localhost:4242/api/cart/${userId}/items`, {
    method: "DELETE",
  })
    .then((response) => {
      // Update product stock
      updateProductStockInCheckout();
      console.log("Cart cleared");
      
      document.getElementById("cart-total").textContent =
      "Total: 0 EUR";
      
      loadCartItems();
      
      alert(`Payment was successfully `);
    })
    .catch((error) => {
      console.error("Error clearing cart:", error);
    });
}

function updateProductStockInCheckout() {
  const cartItems = document.querySelectorAll(".cart-item");
  const token = localStorage.getItem("token-iusabndkjanbksd");
  if (!token) {
    return;
  }

  cartItems.forEach((cartItem) => {
    const productId = cartItem.getAttribute("data-product-id");
    const quantityInput = cartItem.querySelector(".quantity-input");
    const quantity = parseInt(quantityInput.value);

    fetch(`http://localhost:4242/api/products/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        const updatedStock = product.stock - quantity;

        fetch(`http://localhost:4242/api/products/${productId}/stock`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            stock: updatedStock,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Product stock updated:", data);
          })
          .catch((error) => {
            console.error("Error updating product stock:", error);
          });
      })
      .catch((error) => {
        console.error("Error retrieving product:", error);
      });
  });
}

function showAddProductForm() {
  const addProductForm = document.getElementById('add-product-form');
  addProductForm.style.display = 'block';
}

function addProduct(event) {
  event.preventDefault();

  // Obtenha os valores dos campos do formulário
  const title = document.getElementById('product-title').value;
  const artist = document.getElementById('product-artist').value;
  const genre = document.getElementById('product-genre').value;
  const price = parseFloat(document.getElementById('product-price').value);
  const imageUrl = document.getElementById('product-imageUrl').value;

  // Crie o objeto de produto com os valores dos campos
  const product = {
    title: title,
    artist: artist,
    genre: genre,
    price: price,
    imageUrl: imageUrl
  };

  // Faça uma requisição POST para adicionar o produto
  fetch('http://localhost:4242/api/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(product)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Product added successfully:', data);
      // Faça o que for necessário após adicionar o produto
      // Por exemplo, atualize a lista de produtos ou exiba uma mensagem de sucesso
    })
    .catch(error => {
      console.error('Error adding product:', error);
      // Lide com o erro adequadamente
    });
}







