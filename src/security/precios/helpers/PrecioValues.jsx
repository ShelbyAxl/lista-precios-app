import { PreciosModel } from "../models/InstitutesModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const PreciosValues = (values) => {
  let Precios = PreciosModel();
  (Precios.IdProdServOK = values.IdProdServOK),
    (Precios.IdPresentaOK = values.IdPresentaOK),
    (Precios.PresentacionDelProducto = values.PresentacionDelProducto),
    (Precios.IdTipoFormulaOK = values.IdTipoFormulaOK);
    (Precios.Formula = values.Formula),
    (Precios.Precio = values.Precio);
  return Precios;
};
