// En PreciosDetailsModal.jsx
import { useEffect, useState } from "react";
import { getOnePrecio } from "../../services/remote/get/getOnePrecio";
import { useSelector } from "react-redux";

const DetailsPreciosModal = ({ preciosId, onClose }) => {
  const [preciosDetails, setPreciosDetails] = useState(null);
  const instituto = useSelector((state) => state.institutes.institutesDataArr);

  useEffect(() => {
    async function fetchPreciosDetails() {
      try {
        const details = await getOnePrecio(instituto, preciosId);
        setPreciosDetails(details);
      } catch (error) {
        console.error(
          `Error al obtener los detalles del instituto con ID ${preciosId}:`,
          error
        );
      }
    }
    fetchPreciosDetails();
  }, [preciosId]);

  return (
    <div className="details">
      {preciosDetails && (
        <div>
          <h2>{preciosDetails.IdProdServOK}</h2>
          <p>PresentacionDelProducto: {preciosDetails.PresentacionDelProducto}</p>
          <p>IdTipoFormulaOK: {preciosDetails.IdTipoFormulaOK}</p>
          <p>Formula: {preciosDetails.Formula}</p>
          <p>Precio: {preciosDetails.Precio}</p>
        </div>
      )}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default DetailsPreciosModal;