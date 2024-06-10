import { useEffect, useMemo, useState } from "react";
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
import UpdateInstituteModal from "../modals/UpdateInstituteModal";
import { DeleteOneInstitute } from "../../services/remote/delete/DeleteOneInstitute";
import DetailsInstituteModal from "../modals/DetailsInstituteModal";

const InstitutesTable = () => {
  const [loadingTable, setLoadingTable] = useState(true);
  const [InstitutesData, setInstitutesData] = useState([]);
  const [selectedInstituteId, setSelectedInstituteId] = useState(null);
  const [rowSelection, setRowSelection] = useState({});
  const [addInstituteShowModal, setAddInstituteShowModal] = useState(false);
  const [updateInstitutesTrigger, setUpdateInstitutesTrigger] = useState(false);
  const [DetailsInstituteShowModal, setDetailsInstituteShowModal] = useState(false);
  const [UpdateInstituteShowModal, setUpdateInstituteShowModal] = useState(false);
  const dispatch = useDispatch();

  const updateInstitutes = async () => {
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
        "Error al obtener los institutos en updateInstitutes de InstitutesTable:",
        error
      );
    }
  };

  useEffect(() => {
    updateInstitutes();
  }, [addInstituteShowModal, updateInstitutesTrigger]);

  const handleRowClick = (row) => {
    setSelectedInstituteId(row.original._id);
    dispatch(SET_ID_INSTITUTES(row.original._id));
  };
  console.log(useSelector((state) => state.institutes.institutesDataArr));

  const InstitutesColumns = useMemo(
    () => [
      { accessorKey: "IdInstitutoOK", header: "ID INSTITUTO OK", size: 150 },
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
            <IconButton
              onClick={() => {
                if (selectedInstituteId !== null) {
                  setUpdateInstituteShowModal(true);
                } else {
                  alert("Por favor, selecciona una fila para editar.");
                }
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Eliminar">
            <IconButton
              onClick={() => {
                if (window.confirm("¿Estás seguro de que deseas eliminarlo?")) {
                  DeleteOneInstitute(selectedInstituteId)
                    .then(() => {
                      updateInstitutes();
                      alert("Instituto eliminado con éxito");
                    })
                    .catch((error) => {
                      console.error("Error al eliminar el instituto:", error);
                      alert("Error al eliminar el instituto");
                    });
                }
              }}
            >
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
      <Dialog open={UpdateInstituteShowModal}>
        <UpdateInstituteModal
          UpdateInstituteShowModal={UpdateInstituteShowModal}
          setUpdateInstituteShowModal={setUpdateInstituteShowModal}
          onClose={() => setUpdateInstituteShowModal(false)}
          instituteId={selectedInstituteId}
          updateInstitutes={updateInstitutes}
        />
      </Dialog>
      <Dialog open={DetailsInstituteShowModal}>
        <DetailsInstituteModal
          instituteId={selectedInstituteId}
          onClose={() => setDetailsInstituteShowModal(false)}
        />
      </Dialog>
    </Box>
  );
};

export default InstitutesTable;
