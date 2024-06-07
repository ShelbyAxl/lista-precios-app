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
import { RolesValues } from "../../helpers/RolesValues";
//FIC: Services
import { getOneRol } from "../../services/remote/get/getOneRol";
import { putRol } from "../../services/remote/put/UpdateOneRol";
const UpdateRoleModal = ({
  UpdateRoleShowModal,
  setUpdateRoleShowModal,
  instituteId,
  RoleId,
}) => {
  const ids = [instituteId, RoleId];
  console.log("<<ids>>", ids);
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
      getRoleData();
  }, [RoleId]);
  async function getRoleData() {
    console.log("getRoleData is called");
    try {
      const RoleData = await getOneRol(ids);
      console.log("Role Data:", RoleData);
      formik.setValues({
        DesCondicion: RoleData.DesCondicion,
        FechaExpiraIni: RoleData.FechaExpiraIni,
        FechaExpiraFin: RoleData.FechaExpiraFin,
        Condicion: RoleData.Condicion,
      });
    } catch (e) {
      console.error("Error al obtener los datos del instituto:", e);
    }
  }
  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      DesCondicion: "",
      FechaExpiraIni: "",
      FechaExpiraFin: "",
      Condicion: "",
    },
    validationSchema: Yup.object({
      DesCondicion: Yup.string().required("Campo requerido"),
      FechaExpiraIni: Yup.string().required("Campo requerido"),
      FechaExpiraFin: Yup.string().required("Campo requerido"),
      Condicion: Yup.string().required("Campo requerido"),
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
        const Role = RolesValues(values);
        console.log("<<Role>>", Role);
        await putRol(ids, Role);
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
      open={UpdateRoleShowModal}
      onClose={() => setUpdateRoleShowModal(false)}
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
            id="DesCondicion"
            label="DesCondicion*"
            value={formik.values.DesCondicion}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.DesCondicion &&
              Boolean(formik.errors.DesCondicion)
            }
            helperText={
              formik.touched.DesCondicion && formik.errors.DesCondicion
            }
          />
          <TextField
            id="FechaExpiraIni"
            label="FechaExpiraIni*"
            value={formik.values.FechaExpiraIni}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.FechaExpiraIni &&
              Boolean(formik.errors.FechaExpiraIni)
            }
            helperText={
              formik.touched.FechaExpiraIni && formik.errors.FechaExpiraIni
            }
          />
          <TextField
            id="FechaExpiraFin"
            label="FechaExpiraFin*"
            value={formik.values.FechaExpiraFin}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.FechaExpiraFin &&
              Boolean(formik.errors.FechaExpiraFin)
            }
            helperText={
              formik.touched.FechaExpiraFin && formik.errors.FechaExpiraFin
            }
          />
          <TextField
            id="Condicion"
            label="Condicion*"
            value={formik.values.Condicion}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.Condicion &&
              Boolean(formik.errors.Condicion)
            }
            helperText={
              formik.touched.Condicion && formik.errors.Condicion
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
            onClick={() => setUpdateRoleShowModal(false)}
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
export default UpdateRoleModal;
