import axios from "axios";

export function AddOneNegocio(id, negocio) {

  console.log(`${import.meta.env.VITE_GET_ALL}/${id}/negocios`);
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_GET_ALL}/${id}/negocios`, negocio)
      .then((response) => {
        console.log("<<RESPONSE>> AddOneInstitute", negocio);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<AddOneInstitute>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOneInstitute>>", error);
        reject(error);
      });
  });
}
