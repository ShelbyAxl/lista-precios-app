import axios from "axios";

export function getOnePromociones(ids) {
  console.log(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones`);
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones`)
      .then((response) => {
        const data = response.data;
        console.log(data, ids[1]);
        let Promociones = {};
        data.map((rol) => {
          if (rol.IdTipoPromoOK == ids[1]) {
            Promociones = {
                IdTipoPromoOK: rol.IdTipoPromoOK,
                DesPromo: rol.DesPromo,
                Formula: rol.Formula,
                FechaExpiraIni: rol.FechaExpiraIni,
                FechaExpiraFin: rol.FechaExpiraFin,
            };
          } else return;
        });
        console.log(Promociones);

        if (response.status === 200 || response.status === 201) {
          resolve(Promociones);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<UpdateOnePromociones>> de forma correcta",
            data
          );
          reject(Promociones);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<UpdateOnePromociones>>", error);
        reject(error);
      });
  });
}
