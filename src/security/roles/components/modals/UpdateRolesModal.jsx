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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
//FIC: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";
//FIC: Helpers
import { RolesValues } from "../../helpers/RolesValues";
import { useSelector } from "react-redux";
//FIC: Services
import { getOneRol } from "../../services/remote/get/getOneRol";
import { putRol } from "../../services/remote/put/UpdateOneRol";

const UpdateRoleModal = ({
  UpdateRoleShowModal,
  setUpdateRoleShowModal,
  instituteId,
  RoleId,
  updateRoles,
}) => {
  const ids = [instituteId, RoleId];
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    if (RoleId) {
      getRoleData();
    }
  }, [RoleId]);

  async function getRoleData() {
    try {
      const roleData = await getOneRol(ids);
      formik.setValues({
        Condicion: roleData.Condicion,
        DesCondicion: roleData.DesCondicion,
        FechaExpiraIni: new Date(roleData.FechaExpiraIni)
          .toISOString()
          .split("T")[0],
        FechaExpiraFin: new Date(roleData.FechaExpiraFin)
          .toISOString()
          .split("T")[0],
      });
    } catch (e) {
      console.error("Error al obtener los datos del rol:", e);
    }
  }

  const formik = useFormik({
    initialValues: {
      Condicion: "",
      DesCondicion: "",
      FechaExpiraIni: "",
      FechaExpiraFin: "",
    },
    validationSchema: Yup.object({
      Condicion: Yup.string().required("Campo requerido"),
      DesCondicion: Yup.string().required("Campo requerido"),
      FechaExpiraIni: Yup.date().required("Campo requerido"),
      FechaExpiraFin: Yup.date()
        .required("Campo requerido")
        .min(
          Yup.ref("FechaExpiraIni"),
          "La fecha de fin no puede ser anterior a la fecha de inicio"
        ),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        const Role = RolesValues(values);
        await putRol(ids, Role);
        setMensajeExitoAlert("Rol fue actualizado y guardado correctamente");
        updateRoles();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo actualizar el Rol");
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
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Rol</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          <TextField
            id="Condicion"
            label="Condicion*"
            value={formik.values.Condicion}
            {...commonTextFieldProps}
            error={formik.touched.Condicion && Boolean(formik.errors.Condicion)}
            helperText={formik.touched.Condicion && formik.errors.Condicion}
          />
          <TextField
            id="DesCondicion"
            label="DesCondicion*"
            value={formik.values.DesCondicion}
            {...commonTextFieldProps}
            error={
              formik.touched.DesCondicion && Boolean(formik.errors.DesCondicion)
            }
            helperText={
              formik.touched.DesCondicion && formik.errors.DesCondicion
            }
          />
          <TextField
            id="FechaExpiraIni"
            label="Fecha Expira Ini*"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.FechaExpiraIni}
            onChange={(event) =>
              formik.setFieldValue("FechaExpiraIni", event.target.value)
            }
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
            label="Fecha Expira Fin*"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={formik.values.FechaExpiraFin}
            onChange={(event) =>
              formik.setFieldValue("FechaExpiraFin", event.target.value)
            }
            {...commonTextFieldProps}
            error={
              formik.touched.FechaExpiraFin &&
              Boolean(formik.errors.FechaExpiraFin)
            }
            helperText={
              formik.touched.FechaExpiraFin && formik.errors.FechaExpiraFin
            }
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
            onClick={() => setUpdateRoleShowModal(false)}
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

export default UpdateRoleModal;
