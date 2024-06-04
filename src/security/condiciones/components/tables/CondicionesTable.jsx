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
import { getAllCondiciones } from "../../services/remote/get/getAllCondiciones";
import AddCondicionesModal from "../modals/AddCondicionesModal";

const CondicionessTable = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [CondicionessData, setCondicionessData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [AddCondicionesShowModal, setAddCondicionesShowModal] = useState(false);
  const [selectedCondicionId, setSelectedCondicionId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const AllCondicionessData = await getAllCondiciones();
        setCondicionessData(AllCondicionessData);
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener las condiciones en useEffect de CondicionessTable:",
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

  const CondicionessColumns = useMemo(
    () => [
      { accessorKey: "DesPromo", header: "ID PROMOCION", size: 150 },
      { accessorKey: "IdEtiqueta", header: "ID ETIQUETA", size: 150 },
      { accessorKey: "Etiqueta", header: "ETIQUETA", size: 150 },
      { accessorKey: "Valor", header: "VALOR", size: 150 },
      { accessorKey: "IdComparaValor", header: "ID COMPARADOR", size: 150 },
      {
        accessorKey: "IdOpComparaValores",
        header: "COMPARA VALORES",
        size: 150,
      },
      {
        accessorKey: "IdOpLogicoEtiqueta",
        header: "OP LOGICO ETIQUETA",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: CondicionessColumns,
    data: CondicionessData,
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
    renderBottomToolbarCustomActions: () => (
      <Stack direction="row" sx={{ m: 1 }}>
        <Box>
          <Tooltip title="Agregar">
            <IconButton onClick={() => setAddCondicionesShowModal(true)}>
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
