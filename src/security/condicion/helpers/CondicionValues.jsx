import { CondicionModel } from "../models/CondicionModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const CondicionValues = (values) => {
  let condicion = CondicionModel();
  (condicion.IdTipoOperadorOK = values.IdTipoOperadorOK),
    (condicion.IdTipoOperadorOK = values.IdTipoOperadorOK);
    (condicion.Valor = values.Valor);
    (condicion.Secuencia = values.Secuencia);
  return condicion;
};
