import { getDetailRow } from "../helpers/Utils";

export function PreciosModel() {
  let Precios = {
    IdProdServOK: { type: String },
    IdPresentaOK: { type: String },
    PresentacionDelProducto: { type: String },
    IdTipoFormulaOK: { type: String },
    Formula: { type: String },
    Precio: { type: Number },
  };
  return Precios;
}
