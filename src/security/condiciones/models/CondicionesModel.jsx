import { getDetailRow } from "../helpers/Utils";

export function CondicionesModel() {

  let Valores = {
    valor: { type: String, },
    IdComparaValorOK: { type: String }
  }

  let Institute = {
    IdEtiquetaOK: { type: String },
    Etiqueta: { type: String },
    Valores: Valores,
    IdOpComparaValoresOK: { type: String },
    IdOpLogicoEtiquetaOK: { type: String },
    detail_row: getDetailRow(),
  };
  return Institute;
}
