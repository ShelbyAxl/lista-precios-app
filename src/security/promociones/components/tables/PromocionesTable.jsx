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

const PromocionesTable = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [PromocionesData, setPromocionesData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [AddPromocionesShowModal, setAddPromocionesShowModal] = useState(false);
  const [selectedPromocionId, setSelectedPromocionId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const AllPromocionesData = await getAllPromociones();
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
    setSelectedPromocionId(row.original._id);
    setRowSelection((prev) => ({
      [row.id]: !prev[row.id],
    }));
  };

  const PromocionesColumns = useMemo(
    () => [
      { accessorKey: "DesPromo", header: "DESCUENTO DE PROMOCION", size: 150 },
      {
        accessorKey: "IdTipoPromoOK",
        header: "ID TIPO PROMOCION OK",
        size: 150,
      },
      { accessorKey: "Formula", header: "FORMULA", size: 150 },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: PromocionesColumns,
    data: PromocionesData,
    getRowId: (row) => row._id,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleRowClick(row),
      selected: !!rowSelection[row.id],
      sx: {
        cursor: "pointer",
        backgroundColor: rowSelection[row.id] ? "lightgreen" : "white",
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
                  // Implement edit logic here
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
            <IconButton>
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
    </Box>
  );
};

export default PromocionesTable;
