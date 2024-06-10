// En InstituteDetailsModal.jsx
import { useEffect, useState } from "react";
import { getOneInstitute } from "../../services/remote/get/getOneInstitute";

const DetailsInstituteModal = ({ instituteId, onClose }) => {
  const [instituteDetails, setInstituteDetails] = useState(null);

  useEffect(() => {
    async function fetchInstituteDetails() {
      try {
        const details = await getOneInstitute(instituteId);
        setInstituteDetails(details);
      } catch (error) {
        console.error(
          `Error al obtener los detalles del instituto con ID ${instituteId}:`,
          error
        );
      }
    }
    fetchInstituteDetails();
  }, [instituteId]);

  return (
    <div className="details">
      {instituteDetails && (
        <div>
          <h2>{instituteDetails.IdInstitutoOK}</h2>
          <p>IdListaOK: {instituteDetails.IdListaOK}</p>
          <p>IdListaBK: {instituteDetails.IdListaBK}</p>
          <p>DesLista: {instituteDetails.DesLista}</p>
          <p>FechaExpiraIni: {instituteDetails.FechaExpiraIni}</p>
          <p>FechaExpiraFin: {instituteDetails.FechaExpiraFin}</p>
          <p>IdTipoListaOK: {instituteDetails.IdTipoListaOK}</p>
        </div>
      )}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default DetailsInstituteModal;