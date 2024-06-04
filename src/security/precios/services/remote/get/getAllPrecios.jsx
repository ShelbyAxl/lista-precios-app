import axios from "axios";

export function getAllPrecios(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${id}/precios`)
      .then((response) => {
        const data = response.data; 
        console.log(data);
        if (response.status === 200) {
          if (data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_Precios>>");
            resolve([]);
          } else {
            console.log("Colección: <<cat_Precios>>", data);
            resolve(data); // Resuelve la promesa con el arreglo de Precios
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllPrecios - Precio>>",
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllPrecios - Precio>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}