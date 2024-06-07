import { NegocioModel } from "../models/NegociosModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const NegocioValues = (values) => {
  let Negocio = NegocioModel();
  (Negocio.IdNegocioOK = values.IdNegocioOK);
  return Negocio;
};
