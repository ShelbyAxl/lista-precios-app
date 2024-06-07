import axios from "axios";

export function getOneNegocio(ids) {
  console.log(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios/${ids[1]}`);
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/negocios`)
      .then((response) => {
        const data = response.data;
        let negocios = {};
        data.map((negocio) => {
          if (negocio.IdNegocioOK == ids[1]) {
            negocios = {
              IdNegocioOK: negocio.IdNegocioOK,
            };
          } else return;
        });
        console.log(negocios);
        console.log(data)

        if (response.status === 200 || response.status === 201) {
          resolve(negocios);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<UpdateOnenegocios>> de forma correcta",
            data
          );
          reject(negocios);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<UpdateOnenegocios>>", error);
        reject(error);
      });
  });
}
