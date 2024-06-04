import axios from "axios";

export function addOneCondicion(ids, condicion) {
  console.log(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/roles/${ids[1]}/condicion_det`);          
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_GET_ALL}/${ids[0]}/roles/${ids[1]}/condicion_det`, condicion)
      .then((response) => {
        console.log("<<RESPONSE>> AddOneCondicion", condicion);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<AddOneCondicion>> de forma correcta",
            data
          );-
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOneCondicion>>", error);
        reject(error);
      });
  });
}
