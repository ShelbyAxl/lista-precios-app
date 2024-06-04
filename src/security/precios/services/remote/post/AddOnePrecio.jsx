import axios from "axios";

export function AddOnePrecio(id, Precio) {
  console.log(`${import.meta.env.VITE_GET_ALL}/${id}/precios`);
  console.log(Precio);
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_GET_ALL}/${id}/precios`, Precio)
      .then((response) => {
        console.log("<<RESPONSE>> AddOnePrecio", Precio);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<AddOnePrecio>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOnePrecio>>", error);
        reject(error);
      });
  });
}
