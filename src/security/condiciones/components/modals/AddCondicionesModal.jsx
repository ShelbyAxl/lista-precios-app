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
//FIC: Services
import { AddOneCondiciones } from "../../services/remote/post/AddOneCondiciones";
import { getCondiciones } from "../../services/remote/get/getCondiciones";
import { useSelector } from "react-redux";

const AddCondicionesModal = ({
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

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdEtiquetaOK: "",
      Etiqueta: "",
      valor: "",
      IdComparaValorOK: "",
      IdOpComparaValoresOK: "",
      IdOpLogicoEtiquetaOK: "",
    },
    validationSchema: Yup.object({
      IdEtiquetaOK: Yup.string().required("Campo requerido"),
      Etiqueta: Yup.string().required("Campo requerido"),
      valor: Yup.string().required("Campo requerido"),
      IdComparaValorOK: Yup.string().required("Campo requerido"),
      IdOpComparaValoresOK: Yup.string().required("Campo requerido"),
      IdOpLogicoEtiquetaOK: Yup.string().required("Campo requerido"),
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
              IdComparaValorOK: values.IdComparaValorOK,
            },
          ],
          IdOpComparaValoresOK: values.IdOpComparaValoresOK,
          IdOpLogicoEtiquetaOK: values.IdOpLogicoEtiquetaOK,
        };
        //FIC: mandamos a consola los datos extraidos
        console.log("<<Condiciones>>", values);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOneCondiciones" y que previamente
        //construye todo el JSON de la coleccion de Condiciones para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await AddOneCondiciones(ids, values);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Condición fue creada y guardada correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar la nueva condición se visualice en la tabla.
        //fetchDataCondiciones();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo crear la condición");
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
            <strong>Agregar Nueva Condición</strong>
          </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Condiciones */}
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* FIC: Campos de captura o selección */}
          <Autocomplete
            id="IdEtiquetaOK"
            options={condicion}
            getOptionLabel={(option) => option.IdEtiquetaOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdEtiquetaOK",
                newValue ? newValue.IdEtiquetaOK : ""
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdEtiquetaOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdEtiquetaOK &&
                  Boolean(formik.errors.IdEtiquetaOK)
                }
                helperText={
                  formik.touched.IdEtiquetaOK && formik.errors.IdEtiquetaOK
                }
              />
            )}
            value={
              condicion.find(
                (option) => option.IdEtiquetaOK === formik.values.IdEtiquetaOK
              ) || null
            }
          />
          <TextField
            id="Etiqueta"
            label="Etiqueta*"
            value={formik.values.Etiqueta}
            {...commonTextFieldProps}
            error={formik.touched.Etiqueta && Boolean(formik.errors.Etiqueta)}
            helperText={formik.touched.Etiqueta && formik.errors.Etiqueta}
          />
          <TextField
            id="valor"
            label="valor*"
            value={formik.values.valor}
            {...commonTextFieldProps}
            error={formik.touched.valor && Boolean(formik.errors.valor)}
            helperText={formik.touched.valor && formik.errors.valor}
          />
          <Autocomplete
            id="IdComparaValorOK"
            options={condicion}
            getOptionLabel={(option) => option.IdComparaValorOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdComparaValorOK",
                newValue ? newValue.IdComparaValorOK : ""
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdComparaValorOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdComparaValorOK &&
                  Boolean(formik.errors.IdComparaValorOK)
                }
                helperText={
                  formik.touched.IdComparaValorOK &&
                  formik.errors.IdComparaValorOK
                }
              />
            )}
            value={
              condicion.find(
                (option) =>
                  option.IdComparaValorOK === formik.values.IdComparaValorOK
              ) || null
            }
          />
          <Autocomplete
            id="IdOpComparaValoresOK"
            options={condicion}
            getOptionLabel={(option) => option.IdOpComparaValoresOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdOpComparaValoresOK",
                newValue ? newValue.IdOpComparaValoresOK : ""
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdOpComparaValoresOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdOpComparaValoresOK &&
                  Boolean(formik.errors.IdOpComparaValoresOK)
                }
                helperText={
                  formik.touched.IdOpComparaValoresOK &&
                  formik.errors.IdOpComparaValoresOK
                }
              />
            )}
            value={
              condicion.find(
                (option) =>
                  option.IdOpComparaValoresOK ===
                  formik.values.IdOpComparaValoresOK
              ) || null
            }
          />
          <Autocomplete
            id="IdOpLogicoEtiquetaOK"
            options={condicion}
            getOptionLabel={(option) => option.IdOpLogicoEtiquetaOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdOpLogicoEtiquetaOK",
                newValue ? newValue.IdOpLogicoEtiquetaOK : ""
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdOpLogicoEtiquetaOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdOpLogicoEtiquetaOK &&
                  Boolean(formik.errors.IdOpLogicoEtiquetaOK)
                }
                helperText={
                  formik.touched.IdOpLogicoEtiquetaOK &&
                  formik.errors.IdOpLogicoEtiquetaOK
                }
              />
            )}
            value={
              condicion.find(
                (option) =>
                  option.IdOpLogicoEtiquetaOK ===
                  formik.values.IdOpLogicoEtiquetaOK
              ) || null
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

export default AddCondicionesModal;
