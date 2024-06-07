import axios from "axios";

export function AddOnePromociones(id, Promociones) {
  console.log(`${import.meta.env.VITE_GET_ALL}/${id}/Promociones`);
  console.log(Promociones);
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_GET_ALL}/${id}/promociones`, Promociones)
      .then((response) => {
        console.log("<<RESPONSE>> AddOnePromociones", Promociones);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<AddOnePromociones>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOnePromociones>>", error);
        reject(error);
      });
  });
}
