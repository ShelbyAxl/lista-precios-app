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
import { getAllInstitutes } from "../../services/remote/get/getAllInstitutes";
import { useDispatch, useSelector } from "react-redux";
import { SET_ID_INSTITUTES } from "../../../redux/slices/institutesSlice";
import AddInstituteModal from "../modals/AddInstituteModal";

const InstitutesTable = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [InstitutesData, setInstitutesData] = useState([]);
  const [selectedInstituteId, setSelectedInstituteId] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  const [addInstituteShowModal, setAddInstituteShowModal] = useState(false);
  const [DetailsInstituteShowModal, setDetailsInstituteShowModal] =
    useState(false);
  const [UpdateInstituteShowModal, setUpdateInstituteShowModal] =
    useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const AllInstitutesData = await getAllInstitutes();
        setInstitutesData(AllInstitutesData);
        setLoadingTable(false);

        // Set initial selection
        if (AllInstitutesData.length > 0) {
          const firstInstituteId = AllInstitutesData[0]._id;
          setSelectedInstituteId(firstInstituteId);
          setRowSelection({ [firstInstituteId]: true });
          dispatch(SET_ID_INSTITUTES(firstInstituteId));
        }
      } catch (error) {
        console.error(
          "Error al obtener los institutos en useEffect de InstitutesTable:",
          error
        );
      }
    }
    fetchData();
  }, [addInstituteShowModal]);

  const handleRowClick = (row) => {
    setSelectedInstituteId(row.original._id);
    dispatch(SET_ID_INSTITUTES(row.original._id));
  };
  console.log(useSelector((state) => state.institutes.institutesDataArr));

  const InstitutesColumns = useMemo(
    () => [
      { accessorKey: "IdInstitutoOK", header: "ID INSTITUTO OK", size: 150 },
      { accessorKey: "Instituto", header: "INSTITUTO", size: 150 },
      { accessorKey: "IdListaOK", header: "ID LISTA OK", size: 150 },
      { accessorKey: "IdListaBK", header: "ID LISTA BK", size: 150 },
      { accessorKey: "DesLista", header: "DESCRIPCION LISTA", size: 150 },
      { accessorKey: "FechaExpiraIni", header: "FECHA INICIAL", size: 150 },
      { accessorKey: "FechaExpiraFin", header: "FECHA FINAL", size: 150 },
      { accessorKey: "IdTipoListaOK", header: "TIPO DE LISTA", size: 150 },
      {
        accessorKey: "IdTipoGeneraListaOK",
        header: "TIPO GENERA LISTA",
        size: 150,
      },
      { accessorKey: "IdListaBaseOK", header: "LISTA BASE", size: 200 },
      { accessorKey: "IdTipoFormulaOK", header: "TIPO FORMULARIO", size: 150 },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: InstitutesColumns,
    data: InstitutesData,
    getRowId: (row) => row._id,
    muiTableBodyRowProps: ({ row }) => ({
      onClick: () => {
        setRowSelection((prev) => ({
          [row.id]: !prev[row.id],
        }));
        handleRowClick(row);
      },
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
            <IconButton onClick={() => setAddInstituteShowModal(true)}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Editar">
            <IconButton onClick={async () => setUpdateInstituteShowModal(true)}>
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
                if (selectedInstituteId !== null) {
                  setDetailsInstituteShowModal(true);
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
      <Dialog open={addInstituteShowModal}>
        <AddInstituteModal
          AddInstituteShowModal={addInstituteShowModal}
          setAddInstituteShowModal={setAddInstituteShowModal}
          onClose={() => setAddInstituteShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};

export default InstitutesTable;
