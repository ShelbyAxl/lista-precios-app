import axios from "axios";

export function getPromociones() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_PROMO}`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        // console.log(condiciones);
        if (response.status === 200) {
          if (data.length === 0) {
            console.info(
              "🛈 No se encontraron documentos en <<cat_Condiciones>>"
            );
            resolve([]);
          } else {
            console.log("Colección: <<cat_Condiciones>>", data);
            resolve(data); // Resuelve la promesa con el arreglo de Condiciones
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllCondiciones - Services>>",
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllCondiciones - Services>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}
