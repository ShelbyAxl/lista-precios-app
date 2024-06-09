import { InstituteModel } from "../models/InstitutesModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const InstituteValues = (values) => {
  let Institute = InstituteModel();
  (Institute.IdInstitutoOK = values.IdInstitutoOK),
    (Institute.IdListaOK = values.IdListaOK),
    (Institute.IdListaBK = values.IdListaBK),
    (Institute.DesLista = values.DesLista),
    (Institute.FechaExpiraIni = values.FechaExpiraIni),
    (Institute.FechaExpiraFin = values.FechaExpiraFin),
    (Institute.IdTipoListaOK = values.IdTipoListaOK),
    (Institute.IdTipoGeneraListaOK = values.IdTipoGeneraListaOK),
    (Institute.IdListaBaseOK = values.IdListaBaseOK),
    (Institute.IdTipoFormulaOK = values.IdTipoFormulaOK);
  return Institute;
};
