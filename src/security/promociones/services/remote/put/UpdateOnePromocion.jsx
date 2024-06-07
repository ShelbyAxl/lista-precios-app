import axios from "axios";
export async function putPromociones(ids, promociones) {

  console.log(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones/${ids[1]}`);
  console.log(promociones)
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones/${ids[1]}`,
        promociones
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("rol actualizado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<putBusiness - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<putBusiness - Business>>", error);
        reject(error);
      });
  });
}
