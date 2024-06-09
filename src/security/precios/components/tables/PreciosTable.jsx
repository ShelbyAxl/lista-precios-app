import React, { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Stack, Tooltip, IconButton, Dialog, Select } from "@mui/material";
import { useSelector } from "react-redux";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import { getAllPrecios } from "../../services/remote/get/getAllPrecios";
import AddPrecioModal from "../modals/AddPrecioModal";
import UpdatePrecioModal from "../modals/UpdatePrecioModal";
import { DeleteOnePrecio } from "../../services/remote/delete/DeleteOnePrecio";

const PreciosTable = () => {
  const id = useSelector((state) => state.institutes.institutesDataArr);
  const [loadingTable, setLoadingTable] = useState(true);
  const [PreciosData, setPreciosData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [AddPrecioShowModal, setAddPrecioShowModal] = useState(false);
  const [selectedPrecioId, setSelectedPrecioId] = useState(null);
  const [UpdatePrecioShowModal, setUpdatePrecioShowModal] = useState(false);

  async function fetchData() {
    try {
      const AllPreciosData = await getAllPrecios(id);
      setPreciosData(AllPreciosData);
      setLoadingTable(false);

      // Set the first row as selected
      if (AllPreciosData.length > 0) {
        setRowSelection({ [AllPreciosData[0].IdProdServOK]: true });
      }
    } catch (error) {
      console.error(
        "Error al obtener los precios en useEffect de PreciosTable:",
        error
      );
    }
  }

  useEffect(() => {
    fetchData();
  }, [id, AddPrecioShowModal, UpdatePrecioShowModal]);

  const handleRowClick = (row) => {
    setSelectedPrecioId(row.original.IdProdServOK);
    console.log(row.original.IdProdServOK);
    setRowSelection((prev) => ({
      [row.id]: !prev[row.id],
    }));
  };
  const handleDelete = async () => {
    if (selectedPrecioId) {
      if (window.confirm("¿Estás seguro de que deseas eliminarlo?")) {
        try {
          const response = await DeleteOnePrecio([id, selectedPrecioId]);
          console.log("Precio eliminado con éxito", response);
          // Actualizar la tabla después de eliminar
          fetchData();
          alert("Precio eliminado con éxito");
        } catch (error) {
          console.error("Error al eliminar el precio:", error);
          alert("Error al eliminar el precio");
        }
      }
    } else {
      alert("Por favor, selecciona un precio para eliminar.");
    }
  };
  const PreciosColumns = useMemo(
    () => [
      { accessorKey: "IdProdServOK", header: "ID PROD SERV OK", size: 150 },
      {
        accessorKey: "PresentacionDelProducto",
        header: "DESCRIPCION",
        size: 250,
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
    getRowId: (row) => row.IdProdServOK,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => handleRowClick(row),
      selected: !!rowSelection[row.IdProdServOK],
      sx: {
        cursor: "pointer",
        backgroundColor: rowSelection[row.IdProdServOK]
          ? "lightgreen"
          : "white",
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
            <IconButton onClick={() => setUpdatePrecioShowModal(true)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton onClick={() => handleDelete()}>
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
      <Dialog open={UpdatePrecioShowModal}>
        <UpdatePrecioModal
          UpdatePreciosShowModal={UpdatePrecioShowModal}
          setUpdatePreciosShowModal={setUpdatePrecioShowModal}
          onClose={() => setUpdatePrecioShowModal(false)}
          PrecioId={selectedPrecioId}
          instituteId={id}
          updatePrecios={fetchData}
        />
      </Dialog>
    </Box>
  );
};

export default PreciosTable;
