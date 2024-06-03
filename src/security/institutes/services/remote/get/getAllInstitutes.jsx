import axios from "axios";

export function getAllInstitutes() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_GET_ALL)
      .then((response) => {
        const data = response.data;
        const institutos = data.map((item) => {
          return {
            _id: item._id,
            IdInstitutoOK: item.IdInstitutoOK,
            Instituto: item.Instituto,
            IdListaOK: item.IdListaOK,
            IdListaBK: item.IdListaBK,
            DesLista: item.DesLista,
            FechaExpiraIni: item.FechaExpiraIni,
            FechaExpiraFin: item.FechaExpiraFin,
            IdTipoListaOK: item.IdTipoListaOK,
            IdTipoGeneraListaOK: item.IdTipoGeneraListaOK,
            IdListaBaseOK: item.IdListaBaseOK,
            IdTipoFormulaOK: item.IdTipoFormulaOK,
          };
        });
        if (response.status === 200) {
          if (data.length === 0) {
            console.info(
              "🛈 No se encontraron documentos en <<cat_institutos>>"
            );
            resolve(institutos);
          } else {
            console.log("Colección: <<cat_institutos>>", data);
            resolve(institutos);
            // Resuelve la promesa con el arreglo de institutos
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllInstitutes - Services>>",
            data
          );
          reject(institutos); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllInstitutes - Services>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}
