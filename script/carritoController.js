/*Tuve que sacar estas funciones de adentro del bloque del fetch porque descubri que no me andaba el boton
 de vaciado, estuve buscando la solucion por horas y era eso :)*/
//Funcián que crea la tabla de productos en el carrito.
function createTable(colletion = []) {
  let bodyTable = document.getElementById("tableBody");
  bodyTable.innerHTML = "";

  colletion.forEach((element) => {
    const record = document.createElement("tr");
    record.innerHTML = `
      <td scope="row">${element.name}</td>
      <td>${element.quantity}</td>
      <td>${element.price}</td>
      `;

    bodyTable.append(record);
  });
}
//Fución que guarda el carrito y el total en el localStore.
function saveCartAndTotalsToLocalStore(cart, totalQuantity, totalPrice) {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalQuantity", parseInt(totalQuantity));
  localStorage.setItem("totalPrice", parseFloat(totalPrice));
}
//Función que obtiene los totales del localStore.
function getTotalsToLocalStore() {
  totalQuantityJson = parseInt(localStorage.getItem("totalQuantity"));
  totalPriceJson = parseFloat(localStorage.getItem("totalPrice"));
  return {
    totalQuantity: totalQuantityJson,
    totalPrice: totalPriceJson,
  };
}
//Función que obtiene el carrito del localStore.
function getCartToLocalStore() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

//Función que crea la tabla de totales de Cantidad y precio.
function createTableQuantityPrice(totalQuantity, totalPrice) {
  let bodyTable = document.getElementById("tableBodyQuantityPrice");
  bodyTable.innerHTML = "";
  let record = document.createElement("tr");
  record.innerHTML = `
  <td scope="row" class="fw-bold col-4">Total</td>
  <td class="col-4" id="totalQuantity">${totalQuantity}</td>
  <td class="col4">${totalPrice}</td>
  `;
  bodyTable.append(record);
}
fetch("../json/products.json")
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Error al cargar el archivo JSON");
    }
  })
  .then((data) => {
    // Aquí tienes acceso a los datos del JSON

    let products;
    function createCard(pagina, imgIds) {
      const bodyCard = document.getElementById("cardBodyCreated");
      products = data[pagina];

      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        const article = document.createElement("article");
        article.innerHTML = `
      <article class="col">
        <div class="card mx-auto h-100 product-item" id="${product.id}">
          <img src="" id="${imgIds[i]}" class="card-img-top h-100" alt="">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p>Precio: ${product.price}</p>
            <button class="btn btn-primary btn-Comprar">Comprar</button>
          </div>
        </div>
      </article>
    `;
        bodyCard.append(article);
      }
    }
    const pageTitle = document.title;
    if (pageTitle === "Comida || Fast And Food") {
      const imgPageComida = [1, 2, 3, 4];
      createCard("comida", imgPageComida);
      products = data["comida"];
    } else if (pageTitle === "Bebidas || Fast And Food") {
      const imgPageBebida = [5, 6, 7, 8];
      createCard("bebida", imgPageBebida);
      products = data["bebida"];
    } else if (pageTitle === "Postres || Fast And Food") {
      const imgPagePostre = [9, 10, 11, 12, 13, 14];
      createCard("postres", imgPagePostre);
      products = data["postres"];
    }

    //Función que carga el carrito
    function loadCart() {
      return new Promise((resolve) => {
        const cart = getCartToLocalStore();
        if (cart.length === 0) {
          saveCartAndTotalsToLocalStore([], 0, 0);
          resolve([]);
        } else {
          resolve(cart);
        }
      });
    }
    //Carga el carrito, crea la tabla con los productos.
    loadCart()
      .then((cart) => {
        createTable(cart);
        let buttons = document.querySelectorAll(".btn-Comprar");
        //Define a las variable para poder ser utizadas.
        let totalQuantityJson = NaN;
        let totalPriceJson = NaN;
        //Toma los valores guardados en el localStore y verifica que son números.
        const totalFromLocalStore = getTotalsToLocalStore();
        if (
          !isNaN(totalFromLocalStore.totalQuantity) &&
          !isNaN(totalFromLocalStore.totalPrice)
        ) {
          totalQuantityJson = totalFromLocalStore.totalQuantity;
          totalPriceJson = totalFromLocalStore.totalPrice;
        }
        //Se inicializa obteninedo el valor de los Json o 0(cero) caso contrario no suma
        let totalQuantity = totalQuantityJson || 0;
        let totalPrice = totalPriceJson || 0;

        getTotalsToLocalStore();
        if (totalPriceJson === NaN && totalQuantityJson === NaN) {
          createTableQuantityPrice(totalQuantity, totalPrice.toFixed(2));
        } else {
          createTableQuantityPrice(
            totalQuantityJson,
            totalPriceJson.toFixed(2)
          );
        }
        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            let productId = button.closest(".product-item").id;
            let product = products.find(
              (p) => p.id.toString() === productId.toString()
            );

            if (product) {
              const existInCart = cart.find((p) => p.id === product.id);

              if (existInCart) {
                existInCart.quantity += 1;
              } else {
                product.quantity = 1;
                cart.push(product);
              }

              totalQuantity += 1;
              totalPrice += product.price;

              createTable(cart);
              createTableQuantityPrice(totalQuantity, totalPrice.toFixed(2));
              saveCartAndTotalsToLocalStore(cart, totalQuantity, totalPrice);

              Toastify({
                text: "Producto añadido al carrito",
                duration: 3000,
              }).showToast();
            }
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  })
  .catch((error) => {
    console.error(error);
  });
