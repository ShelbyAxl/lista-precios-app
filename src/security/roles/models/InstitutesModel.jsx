import { getDetailRow } from "../helpers/Utils";

export function InstituteModel() {
  let Institute = {
    DesCondicion: { type: String },
    FechaExpiraIni: { type: Date },
    FechaExpiraFin: { type: Date },
    Condicion: { type: String },
    detail_row: getDetailRow(),
  };
  return Institute;
}
