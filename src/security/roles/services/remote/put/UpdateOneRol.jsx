import axios from "axios";
export async function putRol(ids, rol) {

  console.log(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/roles/${ids[1]}`);
  console.log(rol)
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/roles/${ids[1]}`,
        rol
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
