import { getDetailRow } from "../helpers/Utils";

export function CondicionModel() {
  let Institute = {
    IdTipoCondicionOK: { type: String },
    IdTipoOperadorOK: { type: String },
    Valor: { type: String },
    Secuecia: { type: String },
    detail_row: getDetailRow(),
  };
  return Institute;
}
