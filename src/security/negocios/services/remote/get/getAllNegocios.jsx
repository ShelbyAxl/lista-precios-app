import axios from "axios";

export function getAllNegocios() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_GET_ALL)
      .then((response) => {
        const data = response.data;
        const negocios = data.flatMap((item) =>
          item.negocios.map((negocio) => {
            return {
              IdNegocioOK: negocio.IdNegocioOK,

            };
          })
        ); 
        console.log(data);
        if (response.status === 200) {
          if (data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_institutos>>");
            resolve([]);
          } else {
            console.log("Colección: <<cat_institutos>>", data);
            resolve(negocios); // Resuelve la promesa con el arreglo de institutos
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllNegocios - Services>>",
            data
          );
          reject(negocios); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllNegocios - Services>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}