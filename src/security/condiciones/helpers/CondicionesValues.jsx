import { CondicionesModel } from "../models/CondicionesModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const CondicionesValues = (values) => {
  let Institute = CondicionesModel();
    (Institute.IdEtiquetaOK = values.IdEtiquetaOK);
    (Institute.Etiqueta = values.Etiqueta);
    (Institute.Valores = values.Valores);
    (Institute.IdOpComparaValores = values.IdOpComparaValores);
    (Institute.IdOpLogicoEtiqueta = values.IdOpLogicoEtiqueta);

  return Institute;
};
