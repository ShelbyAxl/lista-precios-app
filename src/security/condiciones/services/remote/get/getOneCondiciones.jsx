import axios from "axios";

export function getOneCondiciones(ids) {
  console.log(ids)
  return new Promise((resolve, reject) => {
    axios
      .get(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones/${
          ids[1]
        }/condiciones`
      )
      .then((response) => {
        const data = response.data;
        let condicion = {};
        data.map((condiciones) => {
          if (condiciones.IdEtiquetaOK == ids[2]) {
            condicion = {
              IdEtiquetaOK: condiciones.IdEtiquetaOK,
              Etiqueta: condiciones.Etiqueta,
              valor: condiciones.Valores[0].valor,
              IdComparaValorOK: condiciones.Valores[0].IdComparaValorOK,
              IdOpComparaValoresOK: condiciones.IdOpComparaValoresOK,
              IdOpLogicoEtiquetaOK: condiciones.IdOpLogicoEtiquetaOK,
            };
          } else return;
        });
        if (response.status === 200) {
          if (data.length === 0) {
            console.info(
              "🛈 No se encontraron documentos en <<cat_institutos>>"
            );
            resolve([]);
          } else {
            console.log("Colección: <<cat_institutos>>", data);
            resolve(condicion);
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllInstitutes - Services>>",
            data
          );
          reject(condicion);
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllInstitutes - Services>>", error);
        reject(error);
      });
  });
}
