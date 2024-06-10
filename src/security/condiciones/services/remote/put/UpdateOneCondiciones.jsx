import axios from "axios";

export async function UpdateOneCondiciones(ids, condicion) {
  console.log(
    `${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones/${ids[1]}/condiciones/${
      ids[2]
    }`
  );
  console.log(ids, condicion);
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones/${
          ids[1]
        }/condiciones/${ids[2]}`,
        condicion
      )
      .then((response) => {
        console.log(response.status);
        if (response.status == 200 || response.status == 201) {
          console.log("condicion actualizado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<putStore - Services>>",
            response.data
          );
          reject([]);
        }
      })
      .catch((error) => {
        console.error("Error en <<putStore - Store>>", error);
        reject(error);
      });
  });
}
