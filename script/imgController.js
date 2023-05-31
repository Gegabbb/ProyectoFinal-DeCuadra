/*
Las imagenes por defecto del sitio seguiran activas, por si quieren visualizar
el sitio con las imagenes correctas
Las imagenes actuales obtenidas de la API, es para cumplir con el requisito :)
*/

//Función que asigna el url de la API a la etiqueta img.
const imgProductId = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
async function loadPhotosFromAPI() {
  const result = await fetch("https://jsonplaceholder.typicode.com/photos/");
  const photos = await result.json();
  const ids = imgProductId;
  photos.forEach((photo) => {
    const imgId = photo.id;
    if (ids.includes(imgId)) {
        //Utilizamos el ID de la imagen actual para buscar en el htlm la imagen asociada a esa id.
      const images = document.getElementById(imgId);
      if (images) {
        images.setAttribute("src", photo.thumbnailUrl);
        images.setAttribute("alt", photo.title); 
        
      }
    }
  });
}

//Se obtiene el nombre de la página para cargarle el los IDs a los productos correspondientes.
loadPhotosFromAPI();

