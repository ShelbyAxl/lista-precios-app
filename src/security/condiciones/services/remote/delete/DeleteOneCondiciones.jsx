import axios from "axios";

export async function DeleteOneCondiciones(ids) {
  console.log(ids);
  console.log(
    "HOLA",
    `${import.meta.env.VITE_GET_ALL}/${ids[0]}/roles/${ids[1]}/condicion_det/${
      ids[2]
    }`
  );
  return new Promise((resolve, reject) => {
    axios
      .delete(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones/${
          ids[1]
        }/condiciones/${ids[2]}`
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Condicion eliminado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<deleteCondicion - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<deleteCondicion - Condiciones>>", error);
        reject(error);
      });
  });
}
