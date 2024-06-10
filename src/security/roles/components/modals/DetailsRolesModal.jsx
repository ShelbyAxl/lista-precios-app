// En RolesDetailsModal.jsx
import { useEffect, useState } from "react";
import { getOneRol } from "../../services/remote/get/getOneRol";
import { useSelector } from "react-redux";

const DetailsRolesModal = ({ rolesId, onClose }) => {
  const [rolesDetails, setRolesDetails] = useState(null);
  const instituto = useSelector((state) => state.institutes.institutesDataArr);

  useEffect(() => {
    async function fetchRolesDetails() {
      try {
        console.log("rolesId:", rolesId, "instituto:", instituto);
        const details = await getOneRol([instituto, rolesId]);
        setRolesDetails(details);
      } catch (error) {
        console.error(
          `Error al obtener los detalles del instituto con ID ${rolesId}:`,
          error
        );
      }
    }
    fetchRolesDetails();
  }, [rolesId]);

  return (
    <div className="details">
      {rolesDetails && (
        <div>
          <h2>{rolesDetails.Condicion}</h2>
          <p>DesCondicion: {rolesDetails.DesCondicion}</p>
          <p>FechaExpiraIni: {rolesDetails.FechaExpiraIni}</p>
          <p>FechaExpiraFin: {rolesDetails.FechaExpiraFin}</p>
        </div>
      )}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default DetailsRolesModal;