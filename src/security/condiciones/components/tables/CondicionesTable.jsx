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
import { DeleteOneCondiciones } from "../../services/remote/delete/DeleteOneCondiciones";
import AddCondicionesModal from "../modals/AddCondicionesModal";
import UpdateCondicionesModal from "../modals/UpdateCondicionesModal";
import { useSelector } from "react-redux";

const CondicionessTable = () => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const promociones = useSelector(
    (state) => state.promociones.PromocionesDataArr
  );
  const ids = [instituto, promociones];
  const [loadingTable, setLoadingTable] = useState(true);
  const [CondicionessData, setCondicionessData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [AddCondicionesShowModal, setAddCondicionesShowModal] = useState(false);
  const [selectedCondicionId, setSelectedCondicionId] = useState(null);
  const [UpdateCondicionesShowModal, setUpdateCondicionesShowModal] =
    useState(false);

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

  useEffect(() => {
    fetchData();
  }, [
    instituto,
    promociones,
    AddCondicionesShowModal,
    UpdateCondicionesShowModal,
  ]);

  const handleRowClick = (row) => {
    setSelectedCondicionId(row.original.IdEtiquetaOK);
    console.log(row.original.IdEtiquetaOK);
    setRowSelection((prev) => ({
      [row.id]: !prev[row.id],
    }));
  };

  const CondicionesColumns = useMemo(
    () => [
      { accessorKey: "IdEtiquetaOK", header: "IDETIQUETA", size: 150 },
      { accessorKey: "Etiqueta", header: "ETIQUETA", size: 150 },
      {
        accessor: "Valores[0].valor",
        header: "VALOR",
        size: 150,
        Cell: ({ row }) => {
          return row.original.Valores.length > 0
            ? row.original.Valores[0].valor
            : null;
        },
      },
      {
        accessor: "Valores[0].IdComparaValorOK",
        header: "IDCOMPARAVALOR",
        size: 150,
        Cell: ({ row }) => {
          return row.original.Valores.length > 0
            ? row.original.Valores[0].IdComparaValorOK
            : null;
        },
      },
      {
        accessorKey: "IdOpComparaValoresOK",
        header: "IDOPCOMPARAVALORES",
        size: 150,
      },
      {
        accessorKey: "IdOpLogicoEtiquetaOK",
        header: "IDOPLOGICOETIQUETA",
        size: 150,
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: CondicionesColumns,
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
                  setUpdateCondicionesShowModal(true);
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
            <IconButton
              onClick={async () => {
                if (selectedCondicionId) {
                  if (
                    window.confirm("¿Estás seguro de que deseas eliminarlo?")
                  ) {
                    try {
                      const response = await DeleteOneCondiciones([
                        instituto,
                        promociones,
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
          updateCondiciones={fetchData}
        />
      </Dialog>
    </Box>
  );
};

export default CondicionessTable;
