import axios from "axios";

export function getOnePrecio(instituteId, precioId) {
  console.log(instituteId,precioId);
  console.log(`${import.meta.env.VITE_GET_ALL}/${instituteId}/precios`, precioId);
  return new Promise((resolve, reject) => {
    axios
      .get(`${import.meta.env.VITE_GET_ALL}/${instituteId}/precios`)
      .then((response) => {
        const data = response.data;
        console.log(data);
        let precioso = {};
        data.map((precio) => {
          if (precio.IdProdServOK == precioId) {
            console.log(precioId, "=", precio.IdProdServOK);
            precioso = {
              IdProdServOK: precio.IdProdServOK,
              IdPresentaOK:precio.IdPresentaOK,
              PresentacionDelProducto:precio.PresentacionDelProducto,
              IdTipoFormulaOK:precio.IdTipoFormulaOK,
              Formula:precio.Formula,
              Precio:precio.Precio,
            };
          } else return;
        });
        console.log(precioso);

        if (response.status === 200 || response.status === 201) {
          resolve(precioso);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<UpdateOnePrecio>> de forma correcta",
            data
          );
          reject(precioso);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<UpdateOnePrecio>>", error);
        reject(error);
      });
  });
}

