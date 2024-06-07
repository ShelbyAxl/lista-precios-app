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
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
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
import { AddOneCondiciones } from "../../services/remote/post/AddOneCondiciones";
import { useSelector } from "react-redux";
const AddCondicioneModal = ({
  AddCondicioneShowModal,
  setAddCondicioneShowModal,
  idInstituto,
  idPromocion,
}) => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const promocion = useSelector(
    (state) => state.promociones.PromocionesDataArr
  );
  const ids = [instituto, promocion];
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {}, []);

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: idInstituto,
      IdTipoPromoOK: idPromocion,
      IdEtiquetaOK: "",
      Etiqueta: "",
      valor: "",
      IdComparaValor: "",
      IdOpComparaValores: "",
      IdOpLogicoEtiqueta: "",
    },
    validationSchema: Yup.object({
      IdInstitutoOK: Yup.string().required("Campo requerido"),
      IdTipoPromoOK: Yup.string().required("Campo requerido"),
      IdEtiquetaOK: Yup.string().required("Campo requerido"),
      Etiqueta: Yup.string().required("Campo requerido"),
      valor: Yup.string().required("Campo requerido"),
      IdComparaValor: Yup.string().required("Campo requerido"),
      IdOpComparaValores: Yup.string().required("Campo requerido"),
      IdOpLogicoEtiqueta: Yup.string().required("Campo requerido"),
    }),
    onSubmit: async (values) => {
      //FIC: mostramos el Loading.
      setLoading(true);

      //FIC: notificamos en consola que si se llamo y entro al evento.
      console.log(
        "FIC: entro al onSubmit despues de hacer click en boton Guardar"
      );
      //FIC: reiniciamos los estados de las alertas de exito y error.
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        values = {
          IdEtiquetaOK: values.IdEtiquetaOK,
          Etiqueta: values.Etiqueta,
          Valores: [
            { 
              valor: values.valor, 
              IdComparaValor: values.IdComparaValor
           },
          ],
          IdOpComparaValores: values.IdOpComparaValores,
          IdOpLogicoEtiqueta: values.IdOpLogicoEtiqueta
        };
        const Condiciones = CondicionesValues(values);
        //FIC: mandamos a consola los datos extraidos
        console.log("<<Condiciones>>", Condiciones);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOneCondiciones" y que previamente
        //construye todo el JSON de la coleccion de Institutos para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await AddOneCondiciones(ids, Condiciones);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        //fetchDataCondicione();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear el Instituto");
      }

      //FIC: ocultamos el Loading.
      setLoading(false);
    },
  });
  //FIC: props structure for TextField Control.
  const commonTextFieldProps = {
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    fullWidth: true,
    margin: "dense",
    disabled: !!mensajeExitoAlert,
  };
  return (
    <Dialog
      open={AddCondicioneShowModal}
      onClose={() => setAddCondicioneShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography component="h6">
            <strong>Agregar Nuevo Instituto</strong>
          </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* FIC: Campos de captura o selección */}
          <TextField
            disabled
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
            disabled
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
            id="valor"
            label="valor*"
            value={formik.values.valor}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={formik.touched.valor && Boolean(formik.errors.valor)}
            helperText={formik.touched.valor && formik.errors.valor}
          />
          <TextField
            id="IdComparaValor"
            label="IdComparaValor*"
            value={formik.values.IdComparaValor}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdComparaValor &&
              Boolean(formik.errors.IdComparaValor)
            }
            helperText={
              formik.touched.IdComparaValor && formik.errors.IdComparaValor
            }
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
            onClick={() => setAddCondicioneShowModal(false)}
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
export default AddCondicioneModal;
