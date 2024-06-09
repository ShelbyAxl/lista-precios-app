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
import UpdateNegocioModal from "../modals/UpdateNegocioModal";
import { DeleteOneNegocios } from "../../services/remote/delete/DeleteOneNegocios";
import { useSelector } from "react-redux";

const NegociosTable = () => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);

  const [loadingTable, setLoadingTable] = useState(true);
  const [NegociosData, setNegociosData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [AddNegocioShowModal, setAddNegocioShowModal] = useState(false);
  const [selectedNegocioId, setSelectedNegocioId] = useState(null);
  const [UpdateNegocioShowModal, setUpdateNegocioShowModal] = useState(false);

  const ids = [instituto, selectedNegocioId];

  useEffect(() => {
    async function fetchData() {
      try {
        const AllNegociosData = await getAllNegocios(instituto);
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
  }, [AddNegocioShowModal]);

  const handleRowClick = (row) => {
    setSelectedNegocioId(row.original.IdNegocioOK);
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
            <IconButton onClick={() => setUpdateNegocioShowModal(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton
              onClick={() => {
                if (window.confirm("¿Estás seguro de que deseas eliminarlo?")) {
                  DeleteOneNegocios(ids);
                }
              }}
            >
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
          instituto={instituto}
        />
      </Dialog>
      <Dialog open={UpdateNegocioShowModal}>
        <UpdateNegocioModal
          UpdateNegocioShowModal={UpdateNegocioShowModal}
          setUpdateNegocioShowModal={setUpdateNegocioShowModal}
          onClose={() => setUpdateNegocioShowModal(false)}
          instituteId={instituto}
          negocioId={selectedNegocioId}
        />
      </Dialog>
    </Box>
  );
};

export default NegociosTable;
