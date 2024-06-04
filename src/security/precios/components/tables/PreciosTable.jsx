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
//import PreciosStaticData from '../../../../../db/security/json/Precios/PreciosData';
import { getAllPrecios } from "../../services/remote/get/getAllPrecios";
//FIC: Modals
import AddPrecioModal from "../modals/AddPrecioModal";
import { useSelector, useDispatch } from "react-redux";
//FIC: Columns Table Definition.
const PreciosColumns = [
  {
    accessorKey: "IdProdServOK",
    header: "ID PROD SERV OK",
    size: 150, //small column
  },
  {
    accessorKey: "PresentacionDelProducto",
    header: "ID PRESENTA OK",
    size: 200 //small column
  },
  {
    accessorKey: "IdTipoFormulaOK",
    header: "DESCRIPCION",
    size: 100, //small column
  },
  {
    accessorKey: "Formula",
    header: "FORMULA",
    size: 150, //small column
  },
  {
    accessorKey: "Precio",
    header: "PRECIO",
    size: 150, //small column
  },
];
//FIC: Table - FrontEnd.
const PreciosTable = () => {
  const id = useSelector((state) => state.institutes.institutesDataArr);
  console.log(id);

  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [PreciosData, setPreciosData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddPrecioShowModal, setAddPrecioShowModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const AllPreciosData = await getAllPrecios(id);
        setPreciosData(AllPreciosData);
        //setPreciosData(PreciosStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de PreciosTable:",
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
          columns={PreciosColumns}
          data={PreciosData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddPrecioShowModal(true)}>
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
      <Dialog open={AddPrecioShowModal}>
        <AddPrecioModal
          AddPrecioShowModal={AddPrecioShowModal}
          setAddPrecioShowModal={setAddPrecioShowModal}
          onClose={() => setAddPrecioShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
export default PreciosTable;



