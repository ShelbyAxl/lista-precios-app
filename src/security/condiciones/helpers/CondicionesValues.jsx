import { CondicionesModel } from "../models/CondicionesModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const CondicionesValues = (values) => {
  let Institute = CondicionesModel();
    (Institute.IdEtiquetaOK = values.IdEtiquetaOK);
    (Institute.Etiqueta = values.Etiqueta);
    (Institute.Valores = values.Valores);
    (Institute.IdOpComparaValoresOK = values.IdOpComparaValoresOK);
    (Institute.IdOpLogicoEtiquetaOK = values.IdOpLogicoEtiquetaOK);

  return Institute;
};
