import { getDetailRow } from "../helpers/Utils";

export function CondicionesModel() {

  let Valores = {
    valor: { type: String, },
    IdComparaValor: { type: String }
  }

  let Institute = {
    IdEtiquetaOK: { type: String },
    Etiqueta: { type: String },
    Valores: Valores,
    IdOpComparaValores: { type: String },
    IdOpLogicoEtiqueta: { type: String },
    detail_row: getDetailRow(),
  };
  return Institute;
}
