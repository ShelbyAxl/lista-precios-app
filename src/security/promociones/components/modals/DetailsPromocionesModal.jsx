// En PromocionesDetailsModal.jsx
import { useEffect, useState } from "react";
import { getOnePromociones } from "../../services/remote/get/getOnePromocion";
import { useSelector } from "react-redux";

const DetailsPromocionesModal = ({ promocionesId, onClose }) => {
  const [promocionesDetails, setPromocionesDetails] = useState(null);
  const instituto = useSelector((state) => state.institutes.institutesDataArr);

  useEffect(() => {
    async function fetchPromocionesDetails() {
      try {
        const details = await getOnePromociones([instituto, promocionesId]);
        setPromocionesDetails(details);
      } catch (error) {
        console.error(
          `Error al obtener los detalles del instituto con ID ${promocionesId}:`,
          error
        );
      }
    }
    fetchPromocionesDetails();
  }, [promocionesId]);

  return (
    <div className="details">
      {promocionesDetails && (
        <div>
          <h2>{promocionesDetails.IdTipoPromoOK}</h2>
          <p>DesPromo: {promocionesDetails.DesPromo}</p>
          <p>Formula: {promocionesDetails.Formula}</p>
          <p>FechaExpiraIni: {promocionesDetails.FechaExpiraIni}</p>
          <p>FechaExpiraFin: {promocionesDetails.FechaExpiraFin}</p>
        </div>
      )}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default DetailsPromocionesModal;