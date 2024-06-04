import { getDetailRow } from "../helpers/Utils";

export function CondicionModel() {
  let Institute = {
    IdTipoCondicionOK: { type: String },
    IdTipoOperadorOK: { type: String },
    Valor: { type: String },
    Secuencia: { type: String },
    detail_row: getDetailRow(),
  };
  return Institute;
}
