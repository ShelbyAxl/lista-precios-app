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
import { CondicionesValues } from "../../helpers/CondicionesValues";
//FIC: Services
import { getOneCondiciones } from "../../services/remote/get/getOneCondiciones";
import { UpdateOneCondiciones } from "../../services/remote/put/UpdateOneCondiciones";
const UpdateCondicionesModal = ({
  UpdateCondicionesShowModal,
  setUpdateCondicionesShowModal,
  instituteId,
  promotionId,
  selectedCondicionesId,
}) => {
  const ids = [instituteId, promotionId, selectedCondicionesId];
  console.log("<<ids>>", ids);
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
      getCondicionesData();
  }, [instituteId]);
  async function getCondicionesData() {
    console.log("getCondicionesData is called");
    try {
      const instituteData = await getOneCondiciones(ids);
      console.log("Condiciones Data:", instituteData);
      formik.setValues({
        IdInstitutoOK: instituteId,
        IdTipoPromoOK: promotionId,
        IdEtiquetaOK: instituteData.IdEtiquetaOK,
        Etiqueta: instituteData.Etiqueta,
        valor: instituteData.valor,
        IdComparaValor: instituteData.IdComparaValor,
        IdOpComparaValores: instituteData.IdOpComparaValores,
        IdOpLogicoEtiqueta: instituteData.IdOpLogicoEtiqueta,
      });
    } catch (e) {
      console.error("Error al obtener los datos del instituto:", e);
    }
  }
  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
        IdInstitutoOK: "",
        IdTipoPromoOK: "",
        IdEtiquetaOK: "",
        Etiqueta: "",
        IdOpComparaValores: "",
        IdOpLogicoEtiqueta: "",
    },
    validationSchema: Yup.object({
        IdInstitutoOK: Yup.string().required("Campo requerido"),
        IdTipoPromoOK: Yup.string().required("Campo requerido"),
        IdEtiquetaOK: Yup.string().required("Campo requerido"),
        Etiqueta: Yup.string().required("Campo requerido"),
        IdOpComparaValores: Yup.string().required("Campo requerido"),
        IdOpLogicoEtiqueta: Yup.string().required("Campo requerido"),
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
        values = {
            IdEtiquetaOK: values.IdEtiquetaOK,
            Etiqueta: values.Etiqueta,
            IdOpComparaValores: values.IdOpComparaValores,
            IdOpLogicoEtiqueta: values.IdOpLogicoEtiqueta
          };
        const Condiciones = CondicionesValues(values);
        console.log("<<Condiciones>>", Condiciones);
        await UpdateOneCondiciones(ids, Condiciones);
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
      open={UpdateCondicionesShowModal}
      onClose={() => setUpdateCondicionesShowModal(false)}
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
            id="IdInstitutoOK"
            label="IdInstitutoOK*"
            value={formik.values.IdInstitutoOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdInstitutoOK &&
              Boolean(formik.errors.IdInstitutoOK)
            }
            helperText={
              formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK
            }
          />
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
            id="IdEtiquetaOK"
            label="IdEtiquetaOK*"
            value={formik.values.IdEtiquetaOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdEtiquetaOK && Boolean(formik.errors.IdEtiquetaOK)
            }
            helperText={
              formik.touched.IdEtiquetaOK && formik.errors.IdEtiquetaOK
            }
          />
          <TextField
            id="Etiqueta"
            label="Etiqueta*"
            value={formik.values.Etiqueta}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={formik.touched.Etiqueta && Boolean(formik.errors.Etiqueta)}
            helperText={formik.touched.Etiqueta && formik.errors.Etiqueta}
          />
          <TextField
            id="IdOpComparaValores"
            label="IdOpComparaValores*"
            value={formik.values.IdOpComparaValores}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdOpComparaValores &&
              Boolean(formik.errors.IdOpComparaValores)
            }
            helperText={
              formik.touched.IdOpComparaValores &&
              formik.errors.IdOpComparaValores
            }
          />
          <TextField
            id="IdOpLogicoEtiqueta"
            label="IdOpLogicoEtiqueta*"
            value={formik.values.IdOpLogicoEtiqueta}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdOpLogicoEtiqueta &&
              Boolean(formik.errors.IdOpLogicoEtiqueta)
            }
            helperText={
              formik.touched.IdOpLogicoEtiqueta &&
              formik.errors.IdOpLogicoEtiqueta
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
            onClick={() => setUpdateCondicionesShowModal(false)}
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
export default UpdateCondicionesModal;
