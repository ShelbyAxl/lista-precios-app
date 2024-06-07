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
import { CondicionValues } from "../../helpers/CondicionValues";
//FIC: Services
import { getOneCondicion } from "../../services/remote/get/getOneCondicion";
import { UpdateOneCondicion } from "../../services/remote/put/UpdateOneCondicion";
const UpdateCondicionModal = ({
  UpdateCondicionShowModal,
  setUpdateCondicionShowModal,
  instituteId,
  rolesId,
  condicionId,
}) => {
  const ids = [instituteId, rolesId, condicionId];
  console.log("<<ids>>", ids);
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
      getCondicionData();
  }, [instituteId]);
  async function getCondicionData() {
    console.log("getCondicionData is called");
    try {
      const instituteData = await getOneCondicion(ids);
      console.log("Condicion Data:", instituteData);
      formik.setValues({
        IdTipoCondicionOK: instituteData.IdTipoCondicionOK,
        IdTipoOperadorOK: instituteData.IdTipoOperadorOK,
        Secuecia: instituteData.Secuecia,
      });
    } catch (e) {
      console.error("Error al obtener los datos del instituto:", e);
    }
  }
  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdTipoCondicionOK: "",
      IdTipoOperadorOK: "",
      Secuecia: "",
    },
    validationSchema: Yup.object({
      IdTipoCondicionOK: Yup.string().required("Campo requerido"),
      IdTipoOperadorOK: Yup.string().required("Campo requerido"),
      Secuecia: Yup.string().required("Campo requerido"),
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
        const Condicion = CondicionValues(values);
        console.log("<<Condicion>>", Condicion);
        await UpdateOneCondicion(ids, Condicion);
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
      open={UpdateCondicionShowModal}
      onClose={() => setUpdateCondicionShowModal(false)}
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
            id="IdTipoCondicionOK"
            label="IdTipoCondicionOK*"
            value={formik.values.IdTipoCondicionOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdTipoCondicionOK &&
              Boolean(formik.errors.IdTipoCondicionOK)
            }
            helperText={
              formik.touched.IdTipoCondicionOK && formik.errors.IdTipoCondicionOK
            }
          />
          <TextField
            id="IdTipoOperadorOK"
            label="IdTipoOperadorOK*"
            value={formik.values.IdTipoOperadorOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdTipoOperadorOK &&
              Boolean(formik.errors.IdTipoOperadorOK)
            }
            helperText={
              formik.touched.IdTipoOperadorOK && formik.errors.IdTipoOperadorOK
            }
          />
          <TextField
            id="Secuecia"
            label="Secuecia*"
            value={formik.values.Secuecia}
            {...commonTextFieldProps}
            error={
              formik.touched.Secuecia &&
              Boolean(formik.errors.Secuecia)
            }
            helperText={
              formik.touched.Secuecia && formik.errors.Secuecia
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
            onClick={() => setUpdateCondicionShowModal(false)}
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
export default UpdateCondicionModal;
