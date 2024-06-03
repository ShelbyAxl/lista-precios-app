import axios from "axios";

export function getAllCondiciones() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_GET_ALL)
      .then((response) => {
        const data = response.data; 
        const condiciones = data.flatMap((item) =>
          item.promociones.flatMap((promo) =>  {
            return {
              DesPromo: promo.DesPromo,
              IdEtiqueta: promo.condiciones.IdEtiqueta,
              Etiqueta: promo.condiciones.Etiqueta,
              IdComparaValor: promo.condiciones.IdComparaValor,
              IdOpComparaValores: promo.condiciones.IdOpComparaValores,
              IdOpLogicoEtiqueta: promo.condiciones.IdOpLogicoEtiqueta,
            };
          }
          ) 
        );
        console.log(condiciones);
        if (response.status === 200) {
          if (data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_Condiciones>>");
            resolve([]);
          } else {
            console.log("Colección: <<cat_Condiciones>>", data);
            resolve(condiciones); // Resuelve la promesa con el arreglo de Condiciones
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllCondiciones - Services>>",
            data
          );
          reject(condiciones); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllCondiciones - Services>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}