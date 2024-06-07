import { getDetailRow } from "../helpers/Utils";

export function NegocioModel() {
  let Institute = {
    IdNegocioOK: { type: String },
    detail_row: getDetailRow(),
  };
  return Institute;
}
