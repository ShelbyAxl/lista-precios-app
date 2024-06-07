import axios from "axios";
export async function UpdateOneNegocio(ids, negocio) {

  console.log(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios/${ids[1]}`);
  return new Promise((resolve, reject) => {
    axios
      .put(
        `${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios/${ids[1]}`,
        negocio
      )
      .then((response) => {
        if (response.status === 200) {
          console.log("Negocio actualizado con éxito", response.data);
          resolve(response.data);
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<putNegocio - Services>>",
            response.data
          );
          reject(response.data);
        }
      })
      .catch((error) => {
        console.error("Error en <<putNegocio - Negocio>>", error);
        reject(error);
      });
  });
}
