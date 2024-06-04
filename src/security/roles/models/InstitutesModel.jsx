import { getDetailRow } from "../helpers/Utils";

export function InstituteModel() {
  let Institute = {
    DesCondicion: { type: String },
    FechaExpiraIni: { type: String },
    FechaExpiraFin: { type: String },
    Condicion: { type: String },
    detail_row: getDetailRow(),
  };
  return Institute;
}
