import { InstituteModel } from "../models/InstitutesModel";

//FIC: obtiene los valores capturados en la ventana modal
//enviados desde el evento onSubmit de Formik
export const RolesValues = (values) => {
  let Institute = InstituteModel();
  (Institute.DesCondicion = values.DesCondicion),
    (Institute.FechaExpiraIni = values.FechaExpiraIni),
    (Institute.FechaExpiraFin = values.FechaExpiraFin);
    (Institute.Condicion = values.Condicion);
  return Institute;
};
