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
  FormControlLabel,
  Checkbox,
  Select,
  MenuItem,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";
//FIC: Helpers
import { PreciosValues } from "../../helpers/PrecioValues";
//FIC: Services
import { putPrecio } from "../../services/remote/put/UpdateOnePrecio";
import { getOnePrecio } from "../../services/remote/get/getOnePrecio";
const UpdatePreciosModal = ({
  UpdatePreciosShowModal,
  setUpdatePreciosShowModal,
  instituteId,
  PrecioId,
}) => {
  const ids = [instituteId, PrecioId];
  console.log(ids);
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (instituteId) {
      getPreciosData();
    }
  }, [instituteId]);
  async function getPreciosData() {
    console.log("getPreciosData is called");
    try {
      const instituteData = await getOnePrecio(instituteId, PrecioId);
      console.log("Precios Data:", instituteData);
      formik.setValues({
        IdProdServOK: instituteData.IdProdServOK,
        PresentacionDelProducto: instituteData.PresentacionDelProducto,
        IdTipoFormulaOK: instituteData.IdTipoFormulaOK,
        Formula: instituteData.Formula,
        Precio: instituteData.Precio,
      });
    } catch (e) {
      console.error("Error al obtener los datos del instituto:", e);
    }
  }
  //FIC: Definition Formik y Yup.
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
      console.log("FIC: entro al onSubmit");
      setLoading(true);
      console.log(
        "FIC: entro al onSubmit despues de hacer click en boton Guardar"
      );
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        const Precios = PreciosValues(values);
        console.log("<<Precios>>", Precios);
        await putPrecio(ids, Precios);
        setMensajeExitoAlert(
          "Instituto fue actualizado y guardado Correctamente"
        );
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo actualizar el Instituto");
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
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Instituto</strong>
          </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* FIC: Campos de captura o selección */}
          <TextField
            id="IdProdServOK"
            label="IdProdServOK*"
            value={formik.values.IdProdServOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdProdServOK &&
              Boolean(formik.errors.IdProdServOK)
            }
            helperText={
              formik.touched.IdProdServOK && formik.errors.IdProdServOK
            }
          />
          <TextField
            id="PresentacionDelProducto"
            label="PresentacionDelProducto*"
            value={formik.values.PresentacionDelProducto}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.PresentacionDelProducto &&
              Boolean(formik.errors.PresentacionDelProducto)
            }
            helperText={
              formik.touched.PresentacionDelProducto && formik.errors.PresentacionDelProducto
            }
          />
          <TextField
            id="IdTipoFormulaOK"
            label="IdTipoFormulaOK*"
            value={formik.values.IdTipoFormulaOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdTipoFormulaOK &&
              Boolean(formik.errors.IdTipoFormulaOK)
            }
            helperText={
              formik.touched.IdTipoFormulaOK && formik.errors.IdTipoFormulaOK
            }
          />
          <TextField
            id="Formula"
            label="Formula*"
            value={formik.values.Formula}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.Formula &&
              Boolean(formik.errors.Formula)
            }
            helperText={
              formik.touched.Formula && formik.errors.Formula
            }
          />
          <TextField
            id="Precio"
            label="Precio*"
            value={formik.values.Precio}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.Precio &&
              Boolean(formik.errors.Precio)
            }
            helperText={
              formik.touched.Precio && formik.errors.Precio
            }
          />
        </DialogContent>
        {/* FIC: Aqui van las acciones del usuario como son las alertas o botones */}
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
          <Box m="auto">
            {console.log("mensajeExitoAlert", mensajeExitoAlert)}
            {console.log("mensajeErrorAlert", mensajeErrorAlert)}
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
          {/* FIC: Boton de Cerrar. */}
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setUpdatePreciosShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
          {/* FIC: Boton de Guardar. */}
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
