import { getDetailRow } from "../helpers/Utils";

export function InstituteModel() {
  let Institute = {
    IdInstitutoOK: { type: String },
    Instituto: { type: String },
    IdListaOK: { type: String },
    IdListaBK: { type: String },
    DesLista: { type: String },
    FechaExpiraIni: { type: String },
    FechaExpiraFin: { type: String },
    IdTipoListaOK: { type: String },
    IdTipoGeneraListaOK: { type: String },
    IdListaBaseOK: { type: String },
    IdTipoFormulaOK: { type: String },
    detail_row: getDetailRow(),
  };
  return Institute;
}
