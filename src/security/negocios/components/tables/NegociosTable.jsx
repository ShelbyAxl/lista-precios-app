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
import { getAllNegocios } from "../../services/remote/get/getAllNegocios";
import AddNegocioModal from "../modals/AddNegocioModal";

const NegociosTable = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [NegociosData, setNegociosData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [AddNegocioShowModal, setAddNegocioShowModal] = useState(false);
  const [selectedNegocioId, setSelectedNegocioId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const AllNegociosData = await getAllNegocios();
        setNegociosData(AllNegociosData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los negocios en useEffect de NegociosTable:",
          error
        );
      }
    }
    fetchData();
  }, []);

  const handleRowClick = (row) => {
    setSelectedNegocioId(row.original._id);
    setRowSelection((prev) => ({
      [row.id]: !prev[row.id],
    }));
  };

  const NegociosColumns = useMemo(
    () => [
      {
        accessorKey: "IdNegocioOK",
        header: "ID NEGOCIO OK",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: NegociosColumns,
    data: NegociosData,
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
            <IconButton onClick={() => setAddNegocioShowModal(true)}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                if (selectedNegocioId !== null) {
                  // Implement edit logic here
                } else {
                  alert("Por favor, seleccione un negocio antes de editarlo");
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
                if (selectedNegocioId !== null) {
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
