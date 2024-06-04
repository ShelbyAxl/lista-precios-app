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
import { getAllRoles } from "../../services/remote/get/getAllRoles";
import { useSelector, useDispatch } from "react-redux";
import { SET_ID_ROLES } from "../../../redux/slices/rolesSlice";
//FIC: Modals
import AddRolesModal from "../modals/AddRolesModal";
//FIC: Columns Table Definition.
//FIC: Table - FrontEnd.
const RolesTable = () => {
  const dispatch = useDispatch();
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const [loadingTable, setLoadingTable] = useState(true);
  const [RolesData, setRolesData] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [AddRoleShowModal, setAddRoleShowModal] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const AllRolesData = await getAllRoles(instituto);
        console.log(AllRolesData);
        setRolesData(AllRolesData);
        dispatch(SET_ID_ROLES(AllRolesData[0].Condicion));
        setLoadingTable(false);
      } catch (error) {
        console.error(
          "Error al obtener los roles en useEffect de RolesTable:",
          error
        );
      }
    }
    fetchData();
  }, []);

  const rol = useSelector((state) => state.roles.rolesDataArr);
  console.log(rol);
  const handleRowClick = (row) => {
    setSelectedRoleId(row.original._id);
    dispatch(SET_ID_ROLES(row.original.Condicion));
    
    setRowSelection((prev) => ({
      [row.id]: !prev[row.id],
    }));
  };

  const RolesColumns = useMemo(
    () => [
      {
        accessorKey: "DesCondicion",
        header: "CONDICION DE DESCUENTO",
        size: 150,
      },
      { accessorKey: "FechaExpiraIni", header: "EXPIRACION INICIO", size: 150 },
      { accessorKey: "FechaExpiraFin", header: "EXPIRACION FINAL", size: 150 },
      { accessorKey: "Condicion", header: "CONDICION", size: 150 },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: RolesColumns,
    data: RolesData,
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
            <IconButton onClick={() => setAddRoleShowModal(true)}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton
              onClick={() => {
                if (selectedRoleId !== null) {
                  // Implement edit logic here
                } else {
                  alert("Por favor, seleccione un rol antes de editarlo");
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
                if (selectedRoleId !== null) {
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
      <Dialog open={AddRoleShowModal}>
        <AddRolesModal
          AddRolesShowModal={AddRoleShowModal}
          setAddRolesShowModal={setAddRoleShowModal}
          onClose={() => setAddRoleShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};

export default RolesTable;
