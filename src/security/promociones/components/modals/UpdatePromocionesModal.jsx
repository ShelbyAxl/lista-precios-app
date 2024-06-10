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
import { PromocionesValues } from "../../helpers/PromocionesValues";
//FIC: Services
import { getOnePromociones } from "../../services/remote/get/getOnePromocion";
import { putPromociones } from "../../services/remote/put/UpdateOnePromocion";
import { getPromociones } from "../../services/remote/get/getPromociones";
import { useSelector } from "react-redux";

const UpdatePromocionesModal = ({
  UpdatePromocionesShowModal,
  setUpdatePromocionesShowModal,
  instituteId,
  PromocionesId,
  updatePromociones,
}) => {
  const ids = [instituteId, PromocionesId];
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [promocion, setPromocion] = useState([]);

  useEffect(() => {
    async function fetchPromocion() {
      try {
        const promocion = await getPromociones();
        setPromocion(promocion);
      } catch (error) {
        console.error("Error fetching promocion:", error);
      }
    }

    fetchPromocion();
  }, []);

  useEffect(() => {
    if (PromocionesId) {
      getPromocionesData();
    }
  }, [PromocionesId]);

  async function getPromocionesData() {
    try {
      const PromocionesData = await getOnePromociones(ids);
      formik.setValues({
        IdTipoPromoOK: PromocionesData.IdTipoPromoOK,
        DesPromo: PromocionesData.DesPromo,
        Formula: PromocionesData.Formula,
        FechaExpiraIni: new Date(PromocionesData.FechaExpiraIni)
          .toISOString()
          .split("T")[0],
        FechaExpiraFin: new Date(PromocionesData.FechaExpiraFin)
          .toISOString()
          .split("T")[0],
      });
    } catch (e) {
      console.error("Error al obtener los datos del instituto:", e);
    }
  }

  const formik = useFormik({
    initialValues: {
      IdTipoPromoOK: "",
      DesPromo: "",
      Formula: "",
      FechaExpiraIni: "",
      FechaExpiraFin: "",
    },
    validationSchema: Yup.object({
      IdTipoPromoOK: Yup.string().required("Campo requerido"),
      DesPromo: Yup.string().required("Campo requerido"),
      Formula: Yup.string().required("Campo requerido"),
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
        const Promociones = PromocionesValues(values);
        await putPromociones(ids, Promociones);
        setMensajeExitoAlert(
          "Promoción fue actualizada y guardada correctamente"
        );
        updatePromociones();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo actualizar la Promoción");
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
      open={UpdatePromocionesShowModal}
      onClose={() => setUpdatePromocionesShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Promoción</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          <Autocomplete
            id="IdTipoPromoOK"
            options={promocion}
            getOptionLabel={(option) => option.IdTipoPromoOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdTipoPromoOK",
                newValue ? newValue.IdTipoPromoOK : ""
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdTipoPromoOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdTipoPromoOK &&
                  Boolean(formik.errors.IdTipoPromoOK)
                }
                helperText={
                  formik.touched.IdTipoPromoOK && formik.errors.IdTipoPromoOK
                }
              />
            )}
            value={
              promocion.find(
                (option) => option.IdTipoPromoOK === formik.values.IdTipoPromoOK
              ) || null
            }
          />
          <TextField
            id="DesPromo"
            label="DesPromo*"
            value={formik.values.DesPromo}
            {...commonTextFieldProps}
            error={formik.touched.DesPromo && Boolean(formik.errors.DesPromo)}
            helperText={formik.touched.DesPromo && formik.errors.DesPromo}
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
            onClick={() => setUpdatePromocionesShowModal(false)}
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

export default UpdatePromocionesModal;
