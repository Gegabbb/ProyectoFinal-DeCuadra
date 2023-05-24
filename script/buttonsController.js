//Obtiene los elementos del DOM
const checkPayButton = document.getElementById("payButton");
const totalQuantityButton = document.getElementById("totalQuantity");

//Habilita el botton de pagar, al haber un producto selecionado
function enablePayButton() {
  if (parseInt(totalQuantityButton.textContent) > 0) {
    checkPayButton.disabled = false;
  }
}

//Llama a la funcion para habilitar el boton de pagar
enablePayButton();

//Obteiene el evento y define la direccion del boton
checkPayButton.addEventListener("click", () => {
  //Redireciona a la pagina ticket, si hay un producto seleccionado 
  if (parseInt(totalQuantityButton.textContent) > 0) {
    window.location.href = "/pages/ticket.html";
  }
});

//Funcion que vacia el carrito
function emptyCart() {
  return new Promise((resolve) => {
    saveCartAndTotalsToLocalStore([], 0, 0);
    resolve();
  });
}

//Capturamos el evento click
const vaciarButton = document.getElementById("vaciar-carrito");
vaciarButton.addEventListener("click", () => {
  emptyCart()
    .then(() => {
      Swal.fire({
        title: "¿Quieres vaciar el carrito?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Si",
        denyButtonText: `No`,
      }).then((result) => {
        /* Si preciona confirmar se elimina el carrito, si preciona no, no lo vacia*/
        if (result.isConfirmed) {
          Swal.fire("Vaciando...", " ", "success");
          cart = [];
          createTable(cart);
          createTableQuantityPrice(0, 0);
          setTimeout(() => {
            location.reload();
          }, 1000);
        } else if (result.isDenied) {
          Swal.fire("Cancelando...", "", "info");
        }
      });
    })
    .catch(() => {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `No se ha podido vaciar el carrtio`,
      });
    });
});

//Actualiza la pagina para activar el boton del carrito
const btnReload = document.getElementById("btnReload");
btnReload.addEventListener("click", () => {
  location.reload();
});
