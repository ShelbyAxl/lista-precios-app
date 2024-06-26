import axios from "axios";

export function getAllCondicion(ids) {
  console.log(ids);
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/roles/${ids[1]}/condicion_det`)
      .then((response) => {
        const data = response.data;
        const condicion = data.map((condicion) => {
          return {
            IdTipoCondicionOK: condicion.IdTipoCondicionOK,
            IdTipoOperadorOK: condicion.IdTipoOperadorOK,
            Valor: condicion.Valor,
            Secuecia: condicion.Secuecia,
          };
        }
        );
        console.log(data)
        console.log(condicion);
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
