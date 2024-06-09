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
import { addOneCondicion } from "../../services/remote/post/AddOneCondicion";
import { getCondiciones } from "../../services/remote/get/getCondicion";
import { useSelector } from "react-redux";
//FIC: Services
// import { AddOneCondicion } from "../../../Condicions/services/remote/post/AddOneCondicion";
const AddCondicionModal = ({
  AddCondicionShowModal,
  setAddCondicionShowModal,
}) => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  const roles = useSelector((state) => state.roles.rolesDataArr);
  const ids = [instituto, roles];

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
        const Condicion = CondicionValues(values);
        //FIC: mandamos a consola los datos extraidos
        console.log("<<Condicion>>", Condicion);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOneCondicion" y que previamente
        //construye todo el JSON de la coleccion de Institutos para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await addOneCondicion(ids, Condicion);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        //fetchDataCondicion();
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
      open={AddCondicionShowModal}
      onClose={() => setAddCondicionShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography component="h6">
            <strong>Agregar Nueva Condicion</strong>
          </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* FIC: Campos de captura o selección */}
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
            /* onChange={formik.handleChange} */
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
            onClick={() => setAddCondicionShowModal(false)}
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
export default AddCondicionModal;
