import { getDetailRow } from "../helpers/Utils";

export function PromocionesModel() {
  let Institute = {
    IdTipoPromoOK: { type: String },
    DesPromo: { type: String },
    Formula: { type: String },
    FechaExpiraIni: { type: Date },
    FechaExpiraFin: { type: Date },
    detail_row: getDetailRow(),
  };
  return Institute;
}
