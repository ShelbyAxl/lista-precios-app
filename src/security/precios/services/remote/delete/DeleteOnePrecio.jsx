import axios from "axios";

export async function DeleteOnePrecio(ids) {
  console.log(ids);
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/precios/${ids[1]}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Serie eliminado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<deleteSerie - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<deleteSerie - Series>>", error);
        reject(error);
      });
  });
}
