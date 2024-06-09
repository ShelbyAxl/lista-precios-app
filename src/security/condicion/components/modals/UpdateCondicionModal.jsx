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
//FIC: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";
//FIC: Helpers
import { CondicionValues } from "../../helpers/CondicionValues";
//FIC: Services
import { getOneCondicion } from "../../services/remote/get/getOneCondicion";
import { UpdateOneCondicion } from "../../services/remote/put/UpdateOneCondicion";
import { getCondiciones } from "../../services/remote/get/getCondicion";
import { useSelector } from "react-redux";

const UpdateCondicionModal = ({
  UpdateCondicionShowModal,
  setUpdateCondicionShowModal,
  instituteId,
  rolesId,
  condicionId,
  updateCondicion,
}) => {
  const ids = [instituteId, rolesId, condicionId];
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [condicion, setCondicion] = useState([]);

  useEffect(() => {
    async function fetchCondicion() {
      try {
        const condicion = await getCondiciones();
        setCondicion(condicion);
      } catch (error) {
        console.error("Error fetching condicion:", error);
      }
    }

    fetchCondicion();
  }, []);

  useEffect(() => {
    if (instituteId && rolesId && condicionId) {
      getCondicionData();
    }
  }, [instituteId, rolesId, condicionId]);

  async function getCondicionData() {
    try {
      const condicionData = await getOneCondicion(ids);
      formik.setValues({
        IdTipoCondicionOK: condicionData.IdTipoCondicionOK,
        IdTipoOperadorOK: condicionData.IdTipoOperadorOK,
        Valor: condicionData.Valor,
        Secuecia: condicionData.Secuecia,
      });
    } catch (e) {
      console.error("Error al obtener los datos de la condición:", e);
    }
  }

  const formik = useFormik({
    initialValues: {
      IdTipoCondicionOK: "",
      IdTipoOperadorOK: "",
      Valor: "",
      Secuecia: "",
    },
    validationSchema: Yup.object({
      IdTipoCondicionOK: Yup.string().required("Campo requerido"),
      IdTipoOperadorOK: Yup.string().required("Campo requerido"),
      Valor: Yup.string().required("Campo requerido"),
      Secuecia: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        const Condicion = CondicionValues(values);
        await UpdateOneCondicion(ids, Condicion);
        setMensajeExitoAlert(
          "Condición fue actualizada y guardada correctamente"
        );
        updateCondicion();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo actualizar la Condición");
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
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Condición</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          <Autocomplete
            id="IdTipoCondicionOK"
            options={condicion}
            getOptionLabel={(option) => option.IdTipoCondicionOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdTipoCondicionOK",
                newValue ? newValue.IdTipoCondicionOK : ""
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdTipoCondicionOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdTipoCondicionOK &&
                  Boolean(formik.errors.IdTipoCondicionOK)
                }
                helperText={
                  formik.touched.IdTipoCondicionOK &&
                  formik.errors.IdTipoCondicionOK
                }
              />
            )}
            value={
              condicion.find(
                (option) =>
                  option.IdTipoCondicionOK === formik.values.IdTipoCondicionOK
              ) || null
            }
          />
          <Autocomplete
            id="IdTipoOperadorOK"
            options={condicion}
            getOptionLabel={(option) => option.IdTipoOperadorOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdTipoOperadorOK",
                newValue ? newValue.IdTipoOperadorOK : ""
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdTipoOperadorOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdTipoOperadorOK &&
                  Boolean(formik.errors.IdTipoOperadorOK)
                }
                helperText={
                  formik.touched.IdTipoOperadorOK &&
                  formik.errors.IdTipoOperadorOK
                }
              />
            )}
            value={
              condicion.find(
                (option) =>
                  option.IdTipoOperadorOK === formik.values.IdTipoOperadorOK
              ) || null
            }
          />
          <TextField
            id="Valor"
            label="Valor*"
            value={formik.values.Valor}
            {...commonTextFieldProps}
            error={formik.touched.Valor && Boolean(formik.errors.Valor)}
            helperText={formik.touched.Valor && formik.errors.Valor}
          />
          <TextField
            id="Secuecia"
            label="Secuecia*"
            value={formik.values.Secuecia}
            {...commonTextFieldProps}
            error={formik.touched.Secuecia && Boolean(formik.errors.Secuecia)}
            helperText={formik.touched.Secuecia && formik.errors.Secuecia}
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
            onClick={() => setUpdateCondicionShowModal(false)}
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

export default UpdateCondicionModal;
