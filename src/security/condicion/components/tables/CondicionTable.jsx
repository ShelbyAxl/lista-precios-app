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
//import CondicionStaticData from '../../../../../db/security/json/Condicion/CondicionData';
import { getAllCondicion } from "../../services/remote/get/getAllCondicion";
//FIC: Modals
import AddCondicionModal from "../modals/AddCondicionModal";
//FIC: Columns Table Definition.
const CondicionColumns = [
  {
    accessorKey: "IdTipoCondicionOK",
    header: "ID TIPO CONDICION OK",
    size: 150, //small column
  },
  {
    accessorKey: "IdTipoOperadorOK",
    header: "ID TIPO OPERADOR OK",
    size: 150, //small column
  },
  {
    accessorKey: "Secuecia",
    header: "SECUENCIA",
    size: 150, //small column
  }
];
//FIC: Table - FrontEnd.
const CondicionTable = () => {
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [CondicionData, setCondicionData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddCondicionhowModal, setAddCondicionhowModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const AllCondicionData = await getAllCondicion();
        setCondicionData(AllCondicionData);
        //setCondicionData(CondicionStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de CondicionTable:",
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
          columns={CondicionColumns}
          data={CondicionData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddCondicionhowModal(true)}>
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
      <Dialog open={AddCondicionhowModal}>
        <AddCondicionModal
          AddCondicionhowModal={AddCondicionhowModal}
          setAddCondicionhowModal={setAddCondicionhowModal}
          onClose={() => setAddCondicionhowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
export default CondicionTable;



