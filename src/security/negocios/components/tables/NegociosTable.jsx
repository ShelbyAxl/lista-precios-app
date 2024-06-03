//FIC: React
import React, { useEffect, useMemo, useState } from "react";
//FIC: Material UI
import { MaterialReactTable } from "material-react-table";
import { Box, Stack, Tooltip, Button, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
//FIC: DB
//import NegociosStaticData from '../../../../../db/security/json/Negocios/NegociosData';
import { getAllNegocios } from "../../services/remote/get/getAllNegocios";
//FIC: Modals
import AddNegocioModal from "../modals/AddNegocioModal";
//FIC: Columns Table Definition.
const NegociosColumns = [
  {
    accessorKey: "IdNegocioOK",
    header: "ID NEGOCIO OK",
    size: 150, //small column
  },
];
//FIC: Table - FrontEnd.
const NegociosTable = () => {
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [NegociosData, setNegociosData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddNegocioShowModal, setAddNegocioShowModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const AllNegociosData = await getAllNegocios();
        setNegociosData(AllNegociosData);
        //setNegociosData(NegociosStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de NegociosTable:",
          error
        );
      }
    }
    fetchData();
  }, []);
  return (
    <Box>
      <Box>
        <MaterialReactTable
          columns={NegociosColumns}
          data={NegociosData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddNegocioShowModal(true)}>
                      <AddCircleIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Editar">
                    <IconButton>
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Eliminar">
                    <IconButton>
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Detalles ">
                    <IconButton>
                      <InfoIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Stack>
              {/* ------- BARRA DE ACCIONES FIN ------ */}
            </>
          )}
        />
      </Box>
      {/* M O D A L E S */}
      <Dialog open={AddNegocioShowModal}>
        <AddNegocioModal
          AddNegocioShowModal={AddNegocioShowModal}
          setAddNegocioShowModal={setAddNegocioShowModal}
          onClose={() => setAddNegocioShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
export default NegociosTable;



