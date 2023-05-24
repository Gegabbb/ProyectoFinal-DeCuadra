//Funcion que crea la tabla de productos en el carrito
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

//Fucion que guarda el carrito y el total en el localStore

function saveCartAndTotalsToLocalStore(cart, totalQuantity, totalPrice) {
  localStorage.setItem("cart", JSON.stringify(cart));
  localStorage.setItem("totalQuantity", parseInt(totalQuantity));
  localStorage.setItem("totalPrice", parseFloat(totalPrice));
}
//funcion que obtiene los totales del localStore
function getTotalsToLocalStore() {
  totalQuantityJson = parseInt(localStorage.getItem("totalQuantity"));
  totalPriceJson = parseFloat(localStorage.getItem("totalPrice"));
  return {
    totalQuantity: totalQuantityJson,
    totalPrice: totalPriceJson,
  };
}
//Funcion que obtiene el carrito del localStore
function getCartToLocalStore() {
  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}
//funcion que crea la tabla de totales de Cantidad y precio
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

loadCart()
  .then((cart) => {
    createTable(cart);
    let buttons = document.querySelectorAll(".btn-Comprar");
    //define a las variable para poder ser utizadas
    let totalQuantityJson = NaN;
    let totalPriceJson = NaN;
    //Toma los valores guardados en el localStore y verifica que son numeros
    const totalFromLocalStore = getTotalsToLocalStore();
    if (
      !isNaN(totalFromLocalStore.totalQuantity) &&
      !isNaN(totalFromLocalStore.totalPrice)
    ) {
      totalQuantityJson = totalFromLocalStore.totalQuantity;
      totalPriceJson = totalFromLocalStore.totalPrice;
    }
    //se inicializa obteninedo el valor de los Json o 0(cero) caso contrario no suma
    let totalQuantity = totalQuantityJson || 0;
    let totalPrice = totalPriceJson || 0;

    getTotalsToLocalStore();
    if (totalPriceJson === NaN && totalQuantityJson === NaN) {
      createTableQuantityPrice(totalQuantity, totalPrice.toFixed(2));
    } else {
      createTableQuantityPrice(totalQuantityJson, totalPriceJson.toFixed(2));
    }
    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        let productId = button.closest(".product-item").id;
        let product = products.find((p) => p.id === productId);

        if (product) {
          totalQuantity += product.quantity;
          totalPrice += product.price * product.quantity;
          cart.push(product);
          console.log(cart);
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
