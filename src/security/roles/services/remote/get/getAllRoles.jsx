import axios from "axios";

export function getAllRoles(id) {
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${id}/roles`)
      .then((response) => {
        const data = response.data; 
        
        console.log(data);
        if (response.status === 200) {
          if (data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_roles>>");
            resolve([]);
          } else {
            console.log("Colección: <<cat_roles>>", data);
            resolve(data); // Resuelve la promesa con el arreglo de roles
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllRoles - Roles>>",
            data
          );
          reject(data); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllRoles - Roles>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}