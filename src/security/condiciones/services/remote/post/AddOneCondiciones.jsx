import axios from "axios";

export function AddOneCondiciones(ids, Condicion) {
  console.log(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones/${ids[1]}/condiciones`);
  console.log(Condicion);
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/promociones/${ids[1]}/condiciones`, Condicion)
      .then((response) => {
        console.log("<<RESPONSE>> AddOneCondicion", Condicion);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<AddOneCondicion>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOneCondicion>>", error);
        reject(error);
      });
  });
}
