import axios from "axios";

export function getAllRoles() {
  return new Promise((resolve, reject) => {
    axios
      .get(import.meta.env.VITE_GET_ALL)
      .then((response) => {
        const data = response.data; 
        const roles = data.flatMap((item) =>
          item.roles.map((rol) => {
            return {
              DesCondicion: rol.DesCondicion,
              FechaExpiraIni: rol.FechaExpiraIni,
              FechaExpiraFin: rol.FechaExpiraFin,
              Condicion: rol.Condicion,
            };
          })
        );
        console.log(data);
        if (response.status === 200) {
          if (data.length === 0) {
            console.info("🛈 No se encontraron documentos en <<cat_roles>>");
            resolve([]);
          } else {
            console.log("Colección: <<cat_roles>>", data);
            resolve(roles); // Resuelve la promesa con el arreglo de roles
          }
        } else {
          console.error(
            "No se pudo realizar correctamente la petición <<getAllRoles - Roles>>",
            data
          );
          reject(roles); // Rechaza la promesa con la respuesta si no fue exitosa
        }
      })
      .catch((error) => {
        console.error("Error en <<getAllRoles - Roles>>", error);
        reject(error); // Rechaza la promesa en caso de error
      });
  });
}