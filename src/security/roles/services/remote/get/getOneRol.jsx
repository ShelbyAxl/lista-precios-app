import axios from "axios";

export function getOneRol(ids) {
  console.log(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/roles`);
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/roles`)
      .then((response) => {
        const data = response.data;
        let Rol = {};
        data.map((rol) => {
          if (rol.Condicion == ids[1]) {
            Rol = {
                DesCondicion: rol.DesCondicion,
                Condicion: rol.Condicion,
                FechaExpiraIni: rol.FechaExpiraIni,
                FechaExpiraFin: rol.FechaExpiraFin,
            };
          } else return;
        });
        console.log(Rol);

        if (response.status === 200 || response.status === 201) {
          resolve(Rol);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<UpdateOneRol>> de forma correcta",
            data
          );
          reject(Rol);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<UpdateOneRol>>", error);
        reject(error);
      });
  });
}
