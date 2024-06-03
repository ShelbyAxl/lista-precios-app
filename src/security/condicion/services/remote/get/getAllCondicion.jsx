import axios from "axios";

export function getAllCondicion() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_GET_ALL)
      .then((response) => {
        const data = response.data;
        const condicion = data.flatMap((item) =>
          item.roles.flatMap((rol) => 
          rol.condicion_det.map((condicion) => {
            return {
              IdTipoCondicionOK: condicion.IdTipoCondicionOK,
              IdTipoOperadorOK: condicion.IdTipoOperadorOK,
            };
          })
          )
        );
        console.log(data);
        if (response.status === 200) {
          if (data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_Condicion>>");
            resolve([]);
          } else {
            console.log("Colección: <<cat_Condicion>>", data);
            resolve(condicion); // Resuelve la promesa con el arreglo de Condicion
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllCondicion - Condicion>>",
            data
          );
          reject(condicion); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllCondicion - Condicion>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}
