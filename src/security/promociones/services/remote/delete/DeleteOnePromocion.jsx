import axios from "axios";

export async function DeleteOnePromocion(ids) {
  console.log(ids);
  console.log(
    "HOLA",
    `${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones/${ids[1]}`
  );
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones/${ids[1]}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Promocion eliminado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<deletePromocion - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<deletePromocion - Promociones>>", error);
        reject(error);
      });
  });
}
