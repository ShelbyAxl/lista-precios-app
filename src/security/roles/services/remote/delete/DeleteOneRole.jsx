import axios from "axios";

export async function DeleteOneRole(ids) {
  console.log(ids);
  console.log("HOLA",`${import.meta.env.VITE_GET_ALL}/${ids[0]}/roles/${ids[1]}`);
  return new Promise((resolve, reject) => {
    axios
      .delete(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/roles/${ids[1]}`)
      .then((response) => {
        if (response.status === 200) {
          console.log("Role eliminado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<deleteRole - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<deleteRole - Roles>>", error);
        reject(error);
      });
  });
}
