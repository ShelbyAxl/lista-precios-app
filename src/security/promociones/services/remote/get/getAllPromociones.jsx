import axios from "axios";

export function getAllPromociones() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_GET_ALL)
      .then((response) => {
        const data = response.data; 
        const promociones = data.flatMap((item) =>
          item.promociones.map((promo) => {
            return {
              DesPromo: promo.DesPromo,
              IdTipoPromoOK: promo.IdTipoPromoOK,
              Formula: promo.Formula,
              FechaExpiraIni: promo.FechaExpiraIni,
              FechaExpiraFin: promo.FechaExpiraFin,
            };
          })
        );
        console.log(data);
        if (response.status === 200) {
          if (data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_Promociones>>");
            resolve([]);
          } else {
            console.log("Colección: <<cat_Promociones>>", data);
            resolve(promociones); // Resuelve la promesa con el arreglo de Promociones
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllPromociones - Services>>",
            data
          );
          reject(promociones); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllPromociones - Services>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}