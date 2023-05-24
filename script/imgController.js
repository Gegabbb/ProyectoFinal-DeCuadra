//Esta matriz contiene los Ids de las imagenes de los productos, para cada respectiva pagina
const pageIds = [
  [1, 2, 3, 4],
  [5, 6, 7, 8],
  [9, 10, 11, 12, 13, 14],
];

//función que asigna los Ids a las etiquetas img de cada producto
function assigIdsToImges(pageIndex) {
  const productImgs = document.getElementsByClassName("card-img-top");
  const ids = pageIds[pageIndex];
  for (let index = 0; index < productImgs.length; index++) {
    const productImg = productImgs[index];
    const imgId = ids[index];
    productImg.setAttribute("id", imgId);
  }
}

//función que asigna el url de la API a la etiqueta img
async function loadPhotosFromAPI(pageIndex) {
  const result = await fetch("https://jsonplaceholder.typicode.com/photos/");
  const photos = await result.json();
  const ids = pageIds[pageIndex];
  photos.forEach((photo) => {
    const imgId = photo.id;
    if (ids.includes(imgId)) {
        //Utilizamos el ID de la imagen actual para buscar en el htlm la imagen asociada a esa id
      const images = document.getElementById(ids[ids.indexOf(imgId)]);
      if (images) {
        images.setAttribute("src", photo.thumbnailUrl);
        images.setAttribute("alt", photo.title);
      }
    }
  });
}

//se obtiene el nombre de la pagina para cargarle el los ids a los productos correspondientes
const pageTitle = document.title;
if (pageTitle === "Comida || Fast And Food") {
  assigIdsToImges(0);
  loadPhotosFromAPI(0);
} else if (pageTitle === "Bebidas || Fast And Food") {
  assigIdsToImges(1);
  loadPhotosFromAPI(1);
} else if (pageTitle === "Postres || Fast And Food") {
  assigIdsToImges(2);
  loadPhotosFromAPI(2);
}
