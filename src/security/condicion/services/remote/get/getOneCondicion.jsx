import axios from "axios";

export function getOneCondicion(ids) {
  console.log(ids)
  console.log(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/roles/${ids[1]}/condicion_det/${ids[2]}`);
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/roles/${ids[1]}/condicion_det`)
      .then((response) => {
        const data = response.data;
        let condicion = {};
        data.map((condicion_det) => {
          console.log(condicion_det.IdTipoCondicionOK)
          if (condicion_det.IdTipoCondicionOK == ids[2]) {
            condicion = {
                IdTipoCondicionOK: condicion_det.IdTipoCondicionOK,
                IdTipoOperadorOK: condicion_det.IdTipoOperadorOK,
                Valor: condicion_det.Valor, 
                Secuecia: condicion_det.Secuecia,
            };
          }
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
