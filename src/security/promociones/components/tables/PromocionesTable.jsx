import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Stack, Tooltip, IconButton, Dialog } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllPromociones } from "../../services/remote/get/getAllPromociones";
import AddPromocionesModal from "../modals/AddPromocionesModal";
import UpdatePromocionesModal from "../modals/UpdatePromocionesModal";
import { useDispatch, useSelector } from "react-redux";
import { SET_ID_PROMOCIONES } from "../../../redux/slices/promocionesSlice";

const PromocionesTable = () => {

  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const dispatch = useDispatch();

  const [loadingTable, setLoadingTable] = useState(true);
  const [PromocionesData, setPromocionesData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [AddPromocionesShowModal, setAddPromocionesShowModal] = useState(false);
  const [selectedPromocionId, setSelectedPromocionId] = useState(null);

  const [UpdatePromocionesShowModal, setUpdatePromocionesShowModal] =
    useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const AllPromocionesData = await getAllPromociones();
        console.log(AllPromocionesData);
        dispatch(SET_ID_PROMOCIONES(AllPromocionesData[0].IdTipoPromoOK));
        setPromocionesData(AllPromocionesData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener las promociones en useEffect de PromocionesTable:",
          error
        );
      }
    }
    fetchData();
  }, []);

  const handleRowClick = (row) => {
    setSelectedPromocionId(row.original.IdTipoPromoOK);
    console.log(row.original.IdTipoPromoOK);
    setRowSelection((prev) => ({
      [row.id]: !prev[row.id],
    }));
  };

  const PromocionesColumns = useMemo(
    () => [
      {
        accessorKey: "IdTipoPromoOK",
        header: "ID TIPO PROMOCION OK",
        size: 150,
      },
      { 
        accessorKey: "DesPromo", 
        header: "DESCUENTO DE PROMOCION", 
        size: 150 
      },
      { 
        accessorKey: "Formula", 
        header: "FORMULA", 
        size: 150 
      },
      { 
        accessorKey: "FechaExpiraIni", 
        header: "FECHA INICIO", 
        size: 150 
      },{ 
        accessorKey: "FechaExpiraFin", 
        header: "FECHA FIN", 
        size: 150 
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: PromocionesColumns,
    data: PromocionesData,
    getRowId: (row) => row.IdTipoPromoOK,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleRowClick(row),
      selected: !!rowSelection[row.IdTipoPromoOK],
      sx: {
        cursor: "pointer",
        backgroundColor: rowSelection[row.IdTipoPromoOK] ? "lightgreen" : "white",
      },
    }),
    onRowSelectionChange: setRowSelection,
    state: { rowSelection, isLoading: loadingTable },
    renderTopToolbarCustomActions: () => (
      <Stack direction="row" sx={{ m: 1 }}>
        <Box>
          <Tooltip title="Agregar">
            <IconButton onClick={() => setAddPromocionesShowModal(true)}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                if (selectedPromocionId !== null) {
                  setUpdatePromocionesShowModal(true)
                } else {
                  alert(
                    "Por favor, seleccione una promoción antes de editarla"
                  );
                }
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton  onClick={() => {
              if (window.confirm("¿Estás seguro de que deseas eliminarlo?")) {
                DeleteOnePromociones(selectedPromocionId);
              }
            }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Detalles">
            <IconButton
              onClick={() => {
                if (selectedPromocionId !== null) {
                  // Implement details logic here
                } else {
                  alert("Por favor, selecciona una fila para ver detalles.");
                }
              }}
            >
              <InfoIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    ),
  });

  return (
    <Box>
      <MaterialReactTable table={table} />
      <Dialog open={AddPromocionesShowModal}>
        <AddPromocionesModal
          AddPromocionesShowModal={AddPromocionesShowModal}
          setAddPromocionesShowModal={setAddPromocionesShowModal}
          onClose={() => setAddPromocionesShowModal(false)}
        />
      </Dialog>
      <Dialog open={UpdatePromocionesShowModal}>
        <UpdatePromocionesModal
          UpdatePromocionesShowModal={UpdatePromocionesShowModal}
          setUpdatePromocionesShowModal={setUpdatePromocionesShowModal}
          onClose={() => setUpdatePromocionesShowModal(false)}
          PromocionesId={selectedPromocionId}
          instituteId={instituto}
        />
        </Dialog>
    </Box>
  );
};

export default PromocionesTable;
