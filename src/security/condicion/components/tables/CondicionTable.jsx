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
import { getAllCondicion } from "../../services/remote/get/getAllCondicion";
import AddCondicionModal from "../modals/AddCondicionModal";

const CondicionTable = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [CondicionData, setCondicionData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [AddCondicionShowModal, setAddCondicionShowModal] = useState(false);
  const [selectedCondicionId, setSelectedCondicionId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const AllCondicionData = await getAllCondicion();
        setCondicionData(AllCondicionData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los condiciones en useEffect de CondicionTable:",
          error
        );
      }
    }
    fetchData();
  }, []);

  const handleRowClick = (row) => {
    setSelectedCondicionId(row.original._id);
    setRowSelection((prev) => ({
      [row.id]: !prev[row.id],
    }));
  };

  const CondicionColumns = useMemo(
    () => [
      {
        accessorKey: "IdTipoCondicionOK",
        header: "ID TIPO CONDICION OK",
        size: 150,
      },
      {
        accessorKey: "IdTipoOperadorOK",
        header: "ID TIPO OPERADOR OK",
        size: 150,
      },
      {
        accessorKey: "Valor",
        header: "VALOR",
        size: 150,
      },
      {
        accessorKey: "Secuecia",
        header: "SECUENCIA",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: CondicionColumns,
    data: CondicionData,
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
            <IconButton onClick={() => setAddCondicionShowModal(true)}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                if (selectedCondicionId !== null) {
                  // Implement edit logic here
                } else {
                  alert(
                    "Por favor, seleccione una condición antes de editarla"
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
                if (selectedCondicionId !== null) {
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
      <Dialog open={AddCondicionShowModal}>
        <AddCondicionModal
          AddCondicionShowModal={AddCondicionShowModal}
          setAddCondicionShowModal={setAddCondicionShowModal}
          onClose={() => setAddCondicionShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};

export default CondicionTable;
