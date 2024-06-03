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
// import { NegocioValues } from "../../helpers/NegocioValues";
//FIC: Services
// import { AddOneNegocio } from "../../../Negocios/services/remote/post/AddOneNegocio";
const AddNegocioModal = ({
  AddNegocioShowModal,
  setAddNegocioShowModal,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [NegociosValuesLabel, setNegociosValuesLabel] = useState([]);
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
    getDataSelectNegociosType();
  }, []);

  //FIC: Ejecutamos la API que obtiene todas las etiquetas
  //y filtramos solo la etiqueta de Tipos Giros de Institutos
  //para que los ID y Nombres se agreguen como items en el
  //control <Select> del campo IdTipoGiroOK en la Modal.
  async function getDataSelectNegociosType() {
    try {
      const Labels = await GetAllLabels();
      console.log("Labels:", Labels); // Registrar la respuesta completa
      const NegociosTypes = Labels.find(
        (label) => label.IdEtiquetaOK === "IdTipoGiros"
      );
      console.log("NegociosTypes:", NegociosTypes); // Registrar el resultado de la búsqueda
      if (NegociosTypes) {
        setNegociosValuesLabel(NegociosTypes.valores);
      } else {
        console.error(
          "No se encontraron etiquetas para Tipos Giros de Institutos"
        );
      }
    } catch (e) {
      console.error(
        "Error al obtener Etiquetas para Tipos Giros de Institutos:",
        e
      );
    }
  }

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "",
      IdProdServOK: "",
      IdPresentaOK: "",
    },
    validationSchema: Yup.object({
      IdInstitutoOK: Yup.string().required("Campo requerido"),
      IdProdServOK: Yup.string().required("Campo requerido"),
      IdPresentaOK: Yup.string().required("Campo requerido"),
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
        const Negocio = NegocioValues(values);
        //FIC: mandamos a consola los datos extraidos
        console.log("<<Negocio>>", Negocio);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOneNegocio" y que previamente
        //construye todo el JSON de la coleccion de Institutos para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await AddOneNegocio(Negocio);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        //fetchDataNegocio();
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
      open={AddNegocioShowModal}
      onClose={() => setAddNegocioShowModal(false)}
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
            id="IdInstitutoBK"
            label="IdInstitutoBK*"
            value={formik.values.IdInstitutoBK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdInstitutoBK &&
              Boolean(formik.errors.IdInstitutoBK)
            }
            helperText={
              formik.touched.IdInstitutoBK && formik.errors.IdInstitutoBK
            }
          />
          <TextField
            id="DesInstituto"
            label="DesInstituto*"
            value={formik.values.DesInstituto}
            {...commonTextFieldProps}
            error={
              formik.touched.DesInstituto && Boolean(formik.errors.DesInstituto)
            }
            helperText={
              formik.touched.DesInstituto && formik.errors.DesInstituto
            }
          />
          <TextField
            id="Alias"
            label="Alias*"
            value={formik.values.Alias}
            {...commonTextFieldProps}
            error={formik.touched.Alias && Boolean(formik.errors.Alias)}
            helperText={formik.touched.Alias && formik.errors.Alias}
          />
          {/* <TextField
            id="Matriz"
            label="Matriz*"
            value={formik.values.Matriz}
            {...commonTextFieldProps}
            error={formik.touched.Matriz && Boolean(formik.errors.Matriz)}
            helperText={formik.touched.Matriz && formik.errors.Matriz}
          /> */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formik.values.Matriz}
                onChange={formik.handleChange}
                name="Matriz"
                color="primary"
                disabled={!!mensajeExitoAlert}
              />
            }
            label="Matriz"
          />
          <Select
            value={formik.values.IdTipoGiroOK}
            label="Selecciona una opción"
            onChange={formik.handleChange}
            name="IdTipoGiroOK" //FIC: Asegúrate que coincida con el nombre del campo
            onBlur={formik.handleBlur}
            disabled={!!mensajeExitoAlert}
          >
            {NegociosValuesLabel.map((tipoGiro) => {
              return (
                <MenuItem
                  value={`IdTipoGiros-${tipoGiro.IdValorOK}`}
                  key={tipoGiro.Valor}
                >
                  {tipoGiro.Valor}
                </MenuItem>
              );
            })}
          </Select>
          <TextField
            id="IdInstitutoSupOK"
            label="IdInstitutoSupOK*"
            value={formik.values.IdInstitutoSupOK}
            {...commonTextFieldProps}
            error={
              formik.touched.IdInstitutoSupOK &&
              Boolean(formik.errors.IdInstitutoSupOK)
            }
            helperText={
              formik.touched.IdInstitutoSupOK && formik.errors.IdInstitutoSupOK
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
            onClick={() => setAddNegocioShowModal(false)}
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
export default AddNegocioModal;