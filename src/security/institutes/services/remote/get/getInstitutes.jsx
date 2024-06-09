import axios from "axios";

export function getInstitutes() {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_INSTITUTES}`)
      .then((response) => {
        const data = response.data;
        if (response.status === 200 && data.success) {
          if (data.data[0].dataRes.length === 0) {
            console.info(
              "🛈 No se encontraron documentos en <<cat_institutos>>"
            );
            resolve([]);
          } else {
            console.log("Colección: <<cat_institutos1>>", data.data[0].dataRes);
            resolve(data.data[0].dataRes); // Resuelve la promesa con el arreglo de institutos
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllInstitutes - Services>>",
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllInstitutes - Services>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}
