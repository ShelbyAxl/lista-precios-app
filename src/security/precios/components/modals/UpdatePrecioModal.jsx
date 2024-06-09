import React, { useState, useEffect } from "react";
//FIC: Material
import {
  Dialog,
  DialogContent,
  DialogTitle,
  Typography,
  TextField,
  DialogActions,
  Box,
  Alert,
  Autocomplete,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useSelector } from "react-redux";
//FIC: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";
//FIC: Helpers
import { PreciosValues } from "../../helpers/PrecioValues";
//FIC: Services
import { putPrecio } from "../../services/remote/put/UpdateOnePrecio";
import { getOnePrecio } from "../../services/remote/get/getOnePrecio";
import { getPrecios } from "../../services/remote/get/getPrecios";
import { getAllInstitutes } from "../../../institutes/services/remote/get/getAllInstitutes";

const UpdatePreciosModal = ({
  UpdatePreciosShowModal,
  setUpdatePreciosShowModal,
  instituteId,
  PrecioId,
  updatePrecios,
}) => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  console.log(instituto);

  const ids = [instituteId, PrecioId];
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const [listas, setListas] = useState([]);

  useEffect(() => {
    async function fetchProductos() {
      try {
        const productos = await getPrecios();
        setProductos(productos);
      } catch (error) {
        console.error("Error fetching productos:", error);
      }
    }

    async function fetchListas() {
      try {
        const listas = await getAllInstitutes();
        setListas(listas);
      } catch (error) {
        console.error("Error fetching listas:", error);
      }
    }

    fetchProductos();
    fetchListas();
  }, []);

  useEffect(() => {
    if (instituteId && PrecioId) {
      getPreciosData();
    }
  }, [instituteId, PrecioId]);

  async function getPreciosData() {
    try {
      const precioData = await getOnePrecio(instituteId, PrecioId);
      formik.setValues({
        IdProdServOK: precioData.IdProdServOK,
        PresentacionDelProducto: precioData.PresentacionDelProducto,
        IdTipoFormulaOK: precioData.IdTipoFormulaOK,
        Formula: precioData.Formula,
        Precio: precioData.Precio,
      });
    } catch (e) {
      console.error("Error al obtener los datos del precio:", e);
    }
  }

  const formik = useFormik({
    initialValues: {
      IdProdServOK: "",
      PresentacionDelProducto: "",
      IdTipoFormulaOK: "",
      Formula: "",
      Precio: "",
    },
    validationSchema: Yup.object({
      IdProdServOK: Yup.string().required("Campo requerido"),
      PresentacionDelProducto: Yup.string().required("Campo requerido"),
      IdTipoFormulaOK: Yup.string().required("Campo requerido"),
      Formula: Yup.string().required("Campo requerido"),
      Precio: Yup.number().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        const Precio = PreciosValues(values);
        await putPrecio(ids, Precio);
        setMensajeExitoAlert("Precio fue actualizado y guardado Correctamente");
        updatePrecios();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo actualizar el Precio");
      }
      setLoading(false);
    },
  });

  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };

  return (
    <Dialog
      open={UpdatePreciosShowModal}
      onClose={() => setUpdatePreciosShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Precio</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          <Autocomplete
            id="IdProdServOK"
            options={productos}
            getOptionLabel={(option) => option.IdProdServOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdProdServOK",
                newValue ? newValue.IdProdServOK : ""
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdProdServOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdProdServOK &&
                  Boolean(formik.errors.IdProdServOK)
                }
                helperText={
                  formik.touched.IdProdServOK && formik.errors.IdProdServOK
                }
              />
            )}
            value={
              productos.find(
                (option) => option.IdProdServOK === formik.values.IdProdServOK
              ) || null
            }
          />
          <TextField
            id="PresentacionDelProducto"
            label="PresentacionDelProducto*"
            value={formik.values.PresentacionDelProducto}
            {...commonTextFieldProps}
            error={
              formik.touched.PresentacionDelProducto &&
              Boolean(formik.errors.PresentacionDelProducto)
            }
            helperText={
              formik.touched.PresentacionDelProducto &&
              formik.errors.PresentacionDelProducto
            }
          />
          <Autocomplete
            id="IdTipoFormulaOK"
            options={listas}
            getOptionLabel={(option) => option.IdTipoFormulaOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdTipoFormulaOK",
                newValue ? newValue.IdTipoFormulaOK : ""
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdTipoFormulaOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdTipoFormulaOK &&
                  Boolean(formik.errors.IdTipoFormulaOK)
                }
                helperText={
                  formik.touched.IdTipoFormulaOK &&
                  formik.errors.IdTipoFormulaOK
                }
              />
            )}
            value={
              listas.find(
                (option) =>
                  option.IdTipoFormulaOK === formik.values.IdTipoFormulaOK
              ) || null
            }
          />
          <TextField
            id="Formula"
            label="Formula*"
            value={formik.values.Formula}
            {...commonTextFieldProps}
            error={formik.touched.Formula && Boolean(formik.errors.Formula)}
            helperText={formik.touched.Formula && formik.errors.Formula}
          />
          <TextField
            id="Precio"
            label="Precio*"
            value={formik.values.Precio}
            {...commonTextFieldProps}
            error={formik.touched.Precio && Boolean(formik.errors.Precio)}
            helperText={formik.touched.Precio && formik.errors.Precio}
          />
        </DialogContent>
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
          <Box m="auto">
            {mensajeErrorAlert && (
              <Alert severity="error">
                <b>¡ERROR!</b> ─ {mensajeErrorAlert}
              </Alert>
            )}
            {mensajeExitoAlert && (
              <Alert severity="success">
                <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
              </Alert>
            )}
          </Box>
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setUpdatePreciosShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          <LoadingButton
            color="primary"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
            type="submit"
            disabled={!!mensajeExitoAlert}
            loading={Loading}
          >
            <span>GUARDAR</span>
          </LoadingButton>
        </DialogActions>
      </form>
    </Dialog>
  );
};
export default UpdatePreciosModal;
