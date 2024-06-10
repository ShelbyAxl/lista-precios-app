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
import { DeleteOneCondicion } from "../../services/remote/delete/DeleteOneCondicion";
import AddCondicionModal from "../modals/AddCondicionModal";
import UpdateCondicionModal from "../modals/UpdateCondicionModal";
import DetailsCondicionModal from "../modals/DetailsCondicionModal";
import { useSelector } from "react-redux";

const CondicionTable = () => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const roles = useSelector((state) => state.roles.rolesDataArr);
  const [loadingTable, setLoadingTable] = useState(true);
  const [CondicionData, setCondicionData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [AddCondicionShowModal, setAddCondicionShowModal] = useState(false);
  const [selectedCondicionId, setSelectedCondicionId] = useState(null);
  const [UpdateCondicionShowModal, setUpdateCondicionShowModal] = useState(false);
  const [DetailsCondicionShowModal, setDetailsCondicionShowModal] = useState(false)

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

  useEffect(() => {
    fetchData();
  }, [instituto, roles, AddCondicionShowModal, UpdateCondicionShowModal]);

  const handleRowClick = (row) => {
    setSelectedCondicionId(row.original.IdTipoCondicionOK);
    console.log(row.original.IdTipoCondicionOK);
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
                setUpdateCondicionShowModal(true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton
              onClick={async () => {
                if (selectedCondicionId) {
                  if (
                    window.confirm("¿Estás seguro de que deseas eliminarlo?")
                  ) {
                    try {
                      const response = await DeleteOneCondicion([
                        instituto,
                        roles,
                        selectedCondicionId,
                      ]);
                      console.log("Condición eliminada con éxito", response);
                      // Actualizar la tabla después de eliminar
                      await fetchData();
                      alert("Condición eliminada con éxito");
                    } catch (error) {
                      console.error("Error al eliminar la condición:", error);
                      alert("Error al eliminar la condición");
                    }
                  }
                } else {
                  alert("Por favor, selecciona una condición para eliminar.");
                }
              }}
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Detalles">
            <IconButton
              onClick={() => {
                if (selectedCondicionId !== null) {
                  setDetailsCondicionShowModal(true)
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
      <Dialog open={UpdateCondicionShowModal}>
        <UpdateCondicionModal
          UpdateCondicionShowModal={UpdateCondicionShowModal}
          setUpdateCondicionShowModal={setUpdateCondicionShowModal}
          onClose={() => setUpdateCondicionShowModal(false)}
          instituteId={instituto}
          rolesId={roles}
          condicionId={selectedCondicionId}
          updateCondicion={fetchData}
        />
      </Dialog>
      <Dialog open={DetailsCondicionShowModal}>
        <DetailsCondicionModal
          condicionId={selectedCondicionId}
          onClose={() => setDetailsCondicionShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};

export default CondicionTable;
