import axios from "axios";

export function AddOneRoles(id, roles) {
  console.log(`${import.meta.env.VITE_GET_ALL}/${id}/roles`);
  return new Promise((resolve, reject) => {
    axios
      .post(`${import.meta.env.VITE_GET_ALL}/${id}/roles`, roles)
      .then((response) => {
        console.log("<<RESPONSE>> AddOneRoles", roles);
        const data = response.data;
        console.log(response.status);

        if (response.status === 200 || response.status === 201) {
          resolve(data);
        } else {
          console.error(
            "<<ERROR>> <<NO>> se ejecuto la API <<AddOneRoles>> de forma correcta",
            data
          );
          reject(data);
        }
      })
      .catch((error) => {
        console.error("<<ERROR>> en API <<AddOneRoles>>", error);
        reject(error);
      });
  });
}
