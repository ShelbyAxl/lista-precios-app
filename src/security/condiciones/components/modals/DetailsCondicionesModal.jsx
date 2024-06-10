// En CondicionesDetailsModal.jsx
import { useEffect, useState } from "react";
import { getOneCondiciones } from "../../services/remote/get/getOneCondiciones";
import { useSelector } from "react-redux";

const DetailsCondicionesModal = ({ condicionesId, onClose }) => {
  const [condicionesDetails, setCondicionesDetails] = useState(null);
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const promociones = useSelector((state) => state.promociones.PromocionesDataArr);

  useEffect(() => {
    async function fetchCondicionesDetails() {
      try {
        const details = await getOneCondiciones([instituto, promociones, condicionesId]);
        setCondicionesDetails(details);

        console.log("Fetched Condiciones Details:", details);

      } catch (error) {
        console.error(
          `Error al obtener los detalles del instituto con ID ${condicionesId}:`,
          error
        );
      }
    }
    fetchCondicionesDetails();
  }, [condicionesId]);

  return (
    <div className="details">
      {condicionesDetails && (
        <div>
          <h2>{condicionesDetails.IdEtiquetaOK}</h2>
          <p>Etiqueta: {condicionesDetails.Etiqueta}</p>
          <p>valor: {condicionesDetails.valor}</p>
          <p>IdComparaValorOK: {condicionesDetails.IdComparaValorOK}</p>
          <p>IdOpComparaValoresOK: {condicionesDetails.IdOpComparaValoresOK}</p>
          <p>IdOpLogicoEtiquetaOK: {condicionesDetails.IdOpLogicoEtiquetaOK}</p>
        </div>
      )}
      <button onClick={onClose}>Cerrar</button>
    </div>
  );
};

export default DetailsCondicionesModal;