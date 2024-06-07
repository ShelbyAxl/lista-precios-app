import axios from "axios";

export function getOneCondiciones(ids) {
  console.log(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones/${ids[1]}/condiciones/${ids[2]}`);
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones/${ids[1]}/condiciones`)
      .then((response) => {
        const data = response.data;
        let condicion = {};
        data.map((condiciones) => {
          console.log(condiciones)
          if (condiciones.IdEtiquetaOK == ids[2]) {
            condicion = {
                IdInstitutoOK: condiciones.IdInstitutoOK,
                IdTipoPromoOK: condiciones.IdTipoPromoOK,
                Etiqueta: condiciones.Etiqueta,
                IdEtiquetaOK: condiciones.IdEtiquetaOK,
                IdOpComparaValores: condiciones.IdOpComparaValores,
                IdOpLogicoEtiqueta: condiciones.IdOpLogicoEtiqueta,
            };
          } else return;
        });
        console.log(data)
        console.log(condicion)
        if (response.status === 200) {
          if (data.length === 0) {
            console.info(
              "🛈 No se encontraron documentos en <<cat_institutos>>"
            );
            resolve([]);
          } else {
            console.log("Colección: <<cat_institutos>>", data);
            resolve(condicion);
            // Resuelve la promesa con el arreglo de institutos
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllInstitutes - Services>>",
            data
          );
          reject(condicion); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllInstitutes - Services>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}
