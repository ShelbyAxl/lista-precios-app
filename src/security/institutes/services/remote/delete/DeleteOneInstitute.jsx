import axios from "axios";

export async function DeleteOneInstitute(id) {
  console.log(id);
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_GET_ALL}/${id}`)
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
