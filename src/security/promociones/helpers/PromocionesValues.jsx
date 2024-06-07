import { PromocionesModel } from "../models/PromocionesModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const PromocionesValues = (values) => {
  let Institute = PromocionesModel();
  (Institute.IdTipoPromoOK = values.IdTipoPromoOK),
    (Institute.DesPromo = values.DesPromo),
    (Institute.Formula = values.Formula);
    (Institute.FechaExpiraIni = values.FechaExpiraIni);
    (Institute.FechaExpiraFin = values.FechaExpiraFin);
  return Institute;
};
