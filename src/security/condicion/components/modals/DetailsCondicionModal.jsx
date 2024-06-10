// En CondicionDetailsModal.jsx
import { useEffect, useState } from "react";
import { getOneCondicion } from "../../services/remote/get/getOneCondicion";
import { useSelector } from "react-redux";

const DetailsCondicionModal = ({ condicionId, onClose }) => {
  const [condicionDetails, setCondicionDetails] = useState(null);
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const roles = useSelector((state) => state.roles.rolesDataArr);

  useEffect(() => {
    async function fetchCondicionDetails() {
      try {
        const details = await getOneCondicion([instituto, roles, condicionId]);
        setCondicionDetails(details);
      } catch (error) {
        console.error(
          `Error al obtener los detalles del instituto con ID ${condicionId}:`,
          error
        );
      }
    }
    fetchCondicionDetails();
  }, [condicionId]);

  return (
    <div className="details">
      {condicionDetails && (
        <div>
          <h2>{condicionDetails.IdTipoCondicionOK}</h2>
          <p>IdTipoOperadorOK: {condicionDetails.IdTipoOperadorOK}</p>
          <p>Valor: {condicionDetails.Valor}</p>
          <p>Secuecia: {condicionDetails.Secuecia}</p>
        </div>
      )}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default DetailsCondicionModal;