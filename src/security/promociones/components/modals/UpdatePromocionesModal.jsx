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
import { PromocionesValues } from "../../helpers/PromocionesValues";
//FIC: Services
import { getOnePromociones } from "../../services/remote/get/getOnePromocion";
import { putPromociones } from "../../services/remote/put/UpdateOnePromocion";
const UpdatePromocionesModal = ({
  UpdatePromocionesShowModal,
  setUpdatePromocionesShowModal,
  instituteId,
  PromocionesId,
}) => {
  const ids = [instituteId, PromocionesId];
  console.log("<<ids>>", ids);
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
      getPromocionesData();
  }, [PromocionesId]);
  async function getPromocionesData() {
    console.log("getPromocionesData is called");
    try {
      const PromocionesData = await getOnePromociones(ids);
      console.log("Promociones Data:", PromocionesData);
      formik.setValues({
        IdTipoPromoOK: PromocionesData.IdTipoPromoOK,
        DesPromo: PromocionesData.DesPromo,
        Formula: PromocionesData.Formula,
        FechaExpiraIni: PromocionesData.FechaExpiraIni,
        FechaExpiraFin: PromocionesData.FechaExpiraFin,
      });
    } catch (e) {
      console.error("Error al obtener los datos del instituto:", e);
    }
  }
  //FIC: Definition Formik y Yup.
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
      FechaExpiraIni: Yup.string().required("Campo requerido"),
      FechaExpiraFin: Yup.string().required("Campo requerido"),
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
        const Promociones = PromocionesValues(values);
        console.log("<<Promociones>>", Promociones);
        await putPromociones(ids, Promociones);
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
      open={UpdatePromocionesShowModal}
      onClose={() => setUpdatePromocionesShowModal(false)}
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
            id="IdTipoPromoOK"
            label="IdTipoPromoOK*"
            value={formik.values.IdTipoPromoOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdTipoPromoOK &&
              Boolean(formik.errors.IdTipoPromoOK)
            }
            helperText={
              formik.touched.IdTipoPromoOK && formik.errors.IdTipoPromoOK
            }
          />
          <TextField
            id="DesPromo"
            label="DesPromo*"
            value={formik.values.DesPromo}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.DesPromo &&
              Boolean(formik.errors.DesPromo)
            }
            helperText={
              formik.touched.DesPromo && formik.errors.DesPromo
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
            onClick={() => setUpdatePromocionesShowModal(false)}
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
export default UpdatePromocionesModal;
