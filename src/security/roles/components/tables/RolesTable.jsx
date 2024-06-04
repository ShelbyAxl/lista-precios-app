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
//import RolesStaticData from '../../../../../db/security/json/Roles/RolesData';
import { getAllRoles } from "../../services/remote/get/getAllRoles";
import { useSelector } from "react-redux";
//FIC: Modals
import AddRolesModal from "../modals/AddRolesModal";
//FIC: Columns Table Definition.
const RolesColumns = [
  {
    accessorKey: "DesCondicion",
    header: "CONDICION DE DESCUENTO",
    size: 150, //small column
  },
  {
    accessorKey: "FechaExpiraIni",
    header: "EXPIRACION INICIO",
    size: 150, //small column
  },
  {
    accessorKey: "FechaExpiraFin",
    header: "EXPIRACION FINAL",
    size: 150, //small column
  },
  {
    accessorKey: "Condicion",
    header: "CONDICION",
    size: 150, //small column
  },
];
//FIC: Table - FrontEnd.
const RolesTable = () => {
  //FIC: controlar el estado del indicador (loading).

  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  console.log("instituto:", instituto);

  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [RolesData, setRolesData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddRoleShowModal, setAddRoleShowModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const AllRolesData = await getAllRoles(instituto);
        setRolesData(AllRolesData);
        //setRolesData(RolesStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de RolesTable:",
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
          columns={RolesColumns}
          data={RolesData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddRoleShowModal(true)}>
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
      <Dialog open={AddRoleShowModal}>
        <AddRolesModal
          AddRolesShowModal={AddRoleShowModal}
          setAddRolesShowModal={setAddRoleShowModal}
          onClose={() => setAddRoleShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
export default RolesTable;



