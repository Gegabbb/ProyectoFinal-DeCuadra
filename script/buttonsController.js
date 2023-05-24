//Obtiene los elementos del DOM.
const totalQuantityButton = document.getElementById("totalQuantity");

//Función que vacia el carrito..
function emptyCart() {
  return new Promise((resolve) => {
    saveCartAndTotalsToLocalStore([], 0, 0);
    resolve();
  });
}

//Capturamos el evento click.
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

//Actualiza la página para activar el boton del carrito.
const btnReload = document.getElementById("btnReload");
btnReload.addEventListener("click", () => {
  location.reload();
});
