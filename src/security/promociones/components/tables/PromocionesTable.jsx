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
//import PromocionesStaticData from '../../../../../db/security/json/Promociones/PromocionesData';
import { getAllPromociones } from "../../services/remote/get/getAllPromociones";
//FIC: Modals
import AddPromocionesModal from "../modals/AddPromocionesModal";
//FIC: Columns Table Definition.
const PromocionesColumns = [

  {
    accessorKey: "DesPromo",
    header: "DESCUENTO DE PROMOCION",
    size: 150, //small column
  },
  {
    accessorKey: "IdTipoPromoOK",
    header: "ID TIPO PROMOCION OK",
    size: 150, //small column
  },
  {
    accessorKey: "Formula",
    header: "FORMULA",
    size: 150, //small column
  },
];
//FIC: Table - FrontEnd.
const PromocionesTable = () => {
  //FIC: controlar el estado del indicador (loading).
  const [loadingTable, setLoadingTable] = useState(true);

  //FIC: controlar el estado de la data de Institutos.
  const [PromocionesData, setPromocionesData] = useState([]);
  //FIC: controlar el estado que muesta u oculta la modal de nuevo Instituto.
  const [AddPromocioneshowModal, setAddPromocioneshowModal] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const AllPromocionesData = await getAllPromociones();
        setPromocionesData(AllPromocionesData);
        //setPromocionesData(PromocionesStaticData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de PromocionesTable:",
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
          columns={PromocionesColumns}
          data={PromocionesData}
          state={{ isLoading: loadingTable }}
          initialState={{ density: "compact", showGlobalFilter: true }}
          renderTopToolbarCustomActions={({ table }) => (
            <>
              {/* ------- BARRA DE ACCIONES ------ */}
              <Stack direction="row" sx={{ m: 1 }}>
                <Box>
                  <Tooltip title="Agregar">
                    <IconButton onClick={() => setAddPromocioneshowModal(true)}>
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
      <Dialog open={AddPromocioneshowModal}>
        <AddPromocionesModal
          AddPromocioneshowModal={AddPromocioneshowModal}
          setAddPromocioneshowModal={setAddPromocioneshowModal}
          onClose={() => setAddPromocioneshowModal(false)}
        />
      </Dialog>
    </Box>
  );
};
export default PromocionesTable;



