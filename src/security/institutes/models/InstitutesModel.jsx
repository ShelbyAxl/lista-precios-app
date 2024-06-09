import { getDetailRow } from "../helpers/Utils";

export function InstituteModel() {
  let Institute = {
    IdInstitutoOK: { type: String },
    IdListaOK: { type: String },
    IdListaBK: { type: String },
    DesLista: { type: String },
    FechaExpiraIni: { type: Date },
    FechaExpiraFin: { type: Date },
    IdTipoListaOK: { type: String },
    IdTipoGeneraListaOK: { type: String },
    IdListaBaseOK: { type: String },
    IdTipoFormulaOK: { type: String },
    detail_row: getDetailRow(),
  };
  return Institute;
}
