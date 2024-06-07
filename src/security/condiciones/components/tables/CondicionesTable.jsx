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
import UpdateCondicionesModal from "../modals/UpdateCondicionesModal";
import { useSelector } from "react-redux";

const CondicionessTable = () => {

  const instituto  = useSelector((state) => state.institutes.institutesDataArr);
  const promociones = useSelector((state) => state.promociones.PromocionesDataArr);
  const ids = [instituto, promociones];

  const [loadingTable, setLoadingTable] = useState(true);
  const [CondicionessData, setCondicionessData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [AddCondicionesShowModal, setAddCondicionesShowModal] = useState(false);
  const [selectedCondicionId, setSelectedCondicionId] = useState(null);
  const [UpdateCondicionesShowModal, setUpdateCondicionesShowModal] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const AllCondicionessData = await getAllCondiciones(ids);
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
    setSelectedCondicionId(row.original.IdEtiquetaOK);
    console.log(row.original.IdEtiquetaOK);
    setRowSelection((prev) => ({
      [row.id]: !prev[row.id],
    }));
  };

  const CondicionessColumns = useMemo(
    () => [
      { Cell: ({ row }) => instituto, accessorKey: "instituto", header: "IdInstitutoOK" },
      { Cell: ({ row }) => promociones, accessorKey: "promociones", header: "IdPromocionOK" },
      { accessorKey: "IdEtiquetaOK", header: "ID PROMOCION", size: 150 },
      { accessorKey: "Etiqueta", header: "ID ETIQUETA", size: 150 },
      { accessorKey: "IdOpComparaValores", header: "ID COMPARADOR", size: 150 },
      {
        accessorKey: "IdOpLogicoEtiqueta",
        header: "COMPARA VALORES",
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
    renderTopToolbarCustomActions: () => (
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
                  setUpdateCondicionesShowModal(true)
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
            <IconButton  oonClick={() => {
              if (window.confirm("¿Estás seguro de que deseas eliminarlo?")) {
                DeleteOneCondiciones(selectedCondicionId);
              }
            }}>
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
          AddCondicioneShowModal={AddCondicionesShowModal}
          setAddCondicioneShowModal={setAddCondicionesShowModal}
          idInstituto={instituto}
          idPromocion={promociones}
          onClose={() => setAddCondicionesShowModal(false)}
        />
      </Dialog>
      <Dialog open={UpdateCondicionesShowModal}>
        <UpdateCondicionesModal
          UpdateCondicionesShowModal={UpdateCondicionesShowModal}
          setUpdateCondicionesShowModal={setUpdateCondicionesShowModal}
          onClose={() => setUpdateCondicionesShowModal(false)}
          instituteId={instituto}
          promotionId={promociones}
          selectedCondicionesId={selectedCondicionId}
        />
        </Dialog>
    </Box>
  );
};

export default CondicionessTable;
