const btnPay = document.getElementById("ticketBtnPay");
const cardNumber = document.getElementById("card-number");
const cvvNumber = document.getElementById("cvv-number");
const nameLastname = document.getElementById("name-lastName");
const dni = document.getElementById("dni");
const regex = /^[a-zA-Z\s-]+$/; //Usamos expreciones regulares para vericar que se ingresaron letras.

//Capturamos el evento del botón e imprimimos un mensaje.
btnPay.addEventListener("click", () =>{
    if (cardNumber.value.length === 16 &&cvvNumber.value.length === 3 &&regex.test(nameLastname.value) && dni.value.length === 8 ) {
      //si el pago es correcto imprimimos un alert con sweet alert.
        Swal.fire({
            title: 'Pago procesado correctamente',
            icon: 'success',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
    } else {
      //Si hay algo erroneo el imprimimos un alert de error.
        Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Hay algo mal, revisa los siguientes apartados:
        Número de tarjeta (16 números),
        CVV (3 números),
        DNI (8 números)`,
      });
    } 
    
 })
