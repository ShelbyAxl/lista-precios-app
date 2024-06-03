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
//import CondicionessStaticData from '../../../../../db/security/json/Condicioness/CondicionessData';
import { getAllCondiciones } from "../../services/remote/get/getAllCondiciones";
//FIC: Modals
import AddCondicionesModal from "../modals/AddCondicionesModal";
//FIC: Columns Table Definition.
const CondicionessColumns = [
  {
    accessorKey: "DesPromo",
    header: "ID PROMOCION",
    size: 150, //small column
  },
  {
    accessorKey: "IdEtiqueta",
    header: "ID ETIQUETA",
    size: 150, //small column
  },
  {
    accessorKey: "Etiqueta",
    header: "ETIQUETA",
    size: 150, //small column
  },
  {
    accessorKey: "Valor",
    header: "VALOR",
    size: 150, //small column
  },
  {
    accessorKey: "IdComparaValor",
    header: "ID COMPARADOR",
    size: 150, //small column
  },
  {
    accessorKey: "IdOpComparaValores",
    header: "COMPARA VALORES",
    size: 150, //small column
  },
  {
    accessorKey: "IdOpLogicoEtiqueta",
    header: "OP LOGICO ETIQUETA",
    size: 150, //small column
  },
];
//FIC: Table - FrontEnd.
const CondicionessTable = () => {
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [CondicionessData, setCondicionessData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddCondicionesShowModal, setAddCondicionesShowModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const AllCondicionessData = await getAllCondiciones();
        setCondicionessData(AllCondicionessData);
        //setCondicionessData(CondicionessStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de CondicionessTable:",
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
          columns={CondicionessColumns}
          data={CondicionessData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddCondicionesShowModal(true)}>
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
      <Dialog open={AddCondicionesShowModal}>
        <AddCondicionesModal
          AddCondicionesShowModal={AddCondicionesShowModal}
          setAddCondicionesShowModal={setAddCondicionesShowModal}
          onClose={() => setAddCondicionesShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
export default CondicionessTable;



