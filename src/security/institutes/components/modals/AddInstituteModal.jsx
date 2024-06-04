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
import { InstituteValues } from "../../helpers/InstituteValues";
//FIC: Services
import { AddOneInstitute } from "../../../institutes/services/remote/post/AddOneInstitute";
const AddInstituteModal = ({
  AddInstituteShowModal,
  setAddInstituteShowModal,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);

  useEffect(() => {
  }, []);

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "",
      Instituto: "",
      IdListaOK: "",
      IdListaBK: "",
      DesLista: "",
      FechaExpiraIni: "",
      FechaExpiraFin: "",
      IdTipoListaOK: "",
      IdTipoGeneraListaOK: "",
      IdListaBaseOK: "",
      IdTipoFormulaOK: "",
    },
    validationSchema: Yup.object({
      IdInstitutoOK: Yup.string().required("Campo requerido"),
      Instituto: Yup.string().required("Campo requerido"),
      IdListaOK: Yup.string().required("Campo requerido"),
      IdListaBK: Yup.string().required("Campo requerido"),
      DesLista: Yup.string().required("Campo requerido"),
      FechaExpiraIni: Yup.string().required("Campo requerido"),
      FechaExpiraFin: Yup.string().required("Campo requerido"),
      IdTipoListaOK: Yup.string().required("Campo requerido"),
      IdTipoGeneraListaOK: Yup.string().required("Campo requerido"),
      IdListaBaseOK: Yup.string().required("Campo requerido"),
      IdTipoFormulaOK: Yup.string().required("Campo requerido"),
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
        const Institute = InstituteValues(values);
        //FIC: mandamos a consola los datos extraidos
        console.log("<<Institute>>", Institute);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOneInstitute" y que previamente
        //construye todo el JSON de la coleccion de Institutos para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await AddOneInstitute(Institute);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        //fetchDataInstitute();
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
      open={AddInstituteShowModal}
      onClose={() => setAddInstituteShowModal(false)}
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
            id="Instituto"
            label="Instituto*"
            value={formik.values.Instituto}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.Instituto &&
              Boolean(formik.errors.Instituto)
            }
            helperText={
              formik.touched.Instituto && formik.errors.Instituto
            }
          />
          <TextField
            id="IdListaOK"
            label="IdListaOK*"
            value={formik.values.IdListaOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdListaOK &&
              Boolean(formik.errors.IdListaOK)
            }
            helperText={
              formik.touched.IdListaOK && formik.errors.IdListaOK
            }
          />
          <TextField
            id="IdListaBK"
            label="IdListaBK*"
            value={formik.values.IdListaBK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdListaBK &&
              Boolean(formik.errors.IdListaBK)
            }
            helperText={
              formik.touched.IdListaBK && formik.errors.IdListaBK
            }
          />
          <TextField
            id="DesLista"
            label="DesLista*"
            value={formik.values.DesLista}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.DesLista &&
              Boolean(formik.errors.DesLista)
            }
            helperText={
              formik.touched.DesLista && formik.errors.DesLista
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
            id="IdTipoListaOK"
            label="IdTipoListaOK*"
            value={formik.values.IdTipoListaOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdTipoListaOK &&
              Boolean(formik.errors.IdTipoListaOK)
            }
            helperText={
              formik.touched.IdTipoListaOK && formik.errors.IdTipoListaOK
            }
          />
          <TextField
            id="IdTipoGeneraListaOK"
            label="IdTipoGeneraListaOK*"
            value={formik.values.IdTipoGeneraListaOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdTipoGeneraListaOK &&
              Boolean(formik.errors.IdTipoGeneraListaOK)
            }
            helperText={
              formik.touched.IdTipoGeneraListaOK && formik.errors.IdTipoGeneraListaOK
            }
          />
          <TextField
            id="IdListaBaseOK"
            label="IdListaBaseOK*"
            value={formik.values.IdListaBaseOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdListaBaseOK &&
              Boolean(formik.errors.IdListaBaseOK)
            }
            helperText={
              formik.touched.IdListaBaseOK && formik.errors.IdListaBaseOK
            }
          />
          <TextField
            id="IdTipoFormulaOK"
            label="IdTipoFormulaOK*"
            value={formik.values.IdTipoFormulaOK}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.IdTipoFormulaOK &&
              Boolean(formik.errors.IdTipoFormulaOK)
            }
            helperText={
              formik.touched.IdTipoFormulaOK && formik.errors.IdTipoFormulaOK
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
            onClick={() => setAddInstituteShowModal(false)}
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
export default AddInstituteModal;
