import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Stack, Tooltip, IconButton, Dialog } from "@mui/material";
import { useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllPrecios } from "../../services/remote/get/getAllPrecios";
import AddPrecioModal from "../modals/AddPrecioModal";

const PreciosTable = () => {
  const id = useSelector((state) => state.institutes.institutesDataArr);
  console.log(id);

  const [loadingTable, setLoadingTable] = useState(true);
  const [PreciosData, setPreciosData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [AddPrecioShowModal, setAddPrecioShowModal] = useState(false);
  const [selectedPrecioId, setSelectedPrecioId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const AllPreciosData = await getAllPrecios(id);
        setPreciosData(AllPreciosData);
        setLoadingTable(false);

        // Set the first row as selected
        if (AllPreciosData.length > 0) {
          setRowSelection({ [AllPreciosData[0]._id]: true });
        }
      } catch (error) {
        console.error(
          "Error al obtener los precios en useEffect de PreciosTable:",
          error
        );
      }
    }
    fetchData();
  }, [id]);

  const handleRowClick = (row) => {
    setSelectedPrecioId(row.original._id);
    setRowSelection((prev) => ({
      [row.id]: !prev[row.id],
    }));
  };

  const PreciosColumns = useMemo(
    () => [
      { accessorKey: "IdProdServOK", header: "ID PROD SERV OK", size: 150 },
      { accessorKey: "IdPresentaBK", header: "ID PRESENTA OK", size: 200 },
      {
        accessorKey: "PresentacionDelProducto",
        header: "DESCRIPCION",
        size: 600,
      },
      {
        accessorKey: "IdTipoFormulaOK",
        header: "ID TIPO FORMULA OK",
        size: 150,
      },
      { accessorKey: "Formula", header: "FORMULA", size: 150 },
      { accessorKey: "Precio", header: "PRECIO", size: 150 },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: PreciosColumns,
    data: PreciosData,
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
            <IconButton onClick={() => setAddPrecioShowModal(true)}>
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
          <Tooltip title="Detalles">
            <IconButton>
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
      <Dialog open={AddPrecioShowModal}>
        <AddPrecioModal
          AddPrecioShowModal={AddPrecioShowModal}
          setAddPrecioShowModal={setAddPrecioShowModal}
          onClose={() => setAddPrecioShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};

export default PreciosTable;
