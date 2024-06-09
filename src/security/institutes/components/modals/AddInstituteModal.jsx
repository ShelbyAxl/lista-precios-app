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
import { InstituteValues } from "../../helpers/InstituteValues";
//FIC: Services
import { AddOneInstitute } from "../../../institutes/services/remote/post/AddOneInstitute";
import { getInstitutes } from "../../services/remote/get/getInstitutes";
import { getAllInstitutes } from "../../services/remote/get/getAllInstitutes";
const AddInstituteModal = ({
  AddInstituteShowModal,
  setAddInstituteShowModal,
}) => {
  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [institutes, setInstitutes] = useState([]);
  const [listas, setListas] = useState([]);

  useEffect(() => {
    async function fetchInstitutes() {
      try {
        const institutes = await getInstitutes();
        setInstitutes(institutes);
      } catch (error) {
        console.error("Error fetching institutes:", error);
      }
    }

    async function fetchListas() {
      try {
        const listas = await getAllInstitutes();
        setListas(listas);
      } catch (error) {
        console.error("Error fetching listas:", error);
      }
    }

    fetchInstitutes();
    fetchListas();
  }, []);

  //FIC: Definition Formik y Yup.
  const formik = useFormik({
    initialValues: {
      IdInstitutoOK: "",
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
      IdListaOK: Yup.string().required("Campo requerido"),
      IdListaBK: Yup.string().required("Campo requerido"),
      DesLista: Yup.string().required("Campo requerido"),
      FechaExpiraIni: Yup.date().required("Campo requerido"),
      FechaExpiraFin: Yup.date()
        .required("Campo requerido")
        .min(
          Yup.ref("FechaExpiraIni"),
          "La fecha de fin no puede ser anterior a la fecha de inicio"
        ),
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
          <Autocomplete
            id="IdInstitutoOK"
            options={institutes}
            getOptionLabel={(option) => option.IdInstitutoOK}
            onChange={(event, newValue) => {
              formik.setFieldValue("IdInstitutoOK", newValue ? newValue.IdInstitutoOK : "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdInstitutoOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdInstitutoOK &&
                  Boolean(formik.errors.IdInstitutoOK)
                }
                helperText={
                  formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK
                }
              />
            )}
            value={
              institutes.find(
                (option) => option.IdInstitutoOK === formik.values.IdInstitutoOK
              ) || null
            }
          />
          <Autocomplete
            id="IdListaOK"
            options={listas}
            getOptionLabel={(option) => option.IdListaOK}
            onChange={(event, newValue) => {
              formik.setFieldValue("IdListaOK", newValue ? newValue.IdListaOK : "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdListaOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdListaOK && Boolean(formik.errors.IdListaOK)
                }
                helperText={formik.touched.IdListaOK && formik.errors.IdListaOK}
              />
            )}
            value={
              listas.find(
                (option) => option.IdListaOK === formik.values.IdListaOK
              ) || null
            }
          />
          <Autocomplete
            id="IdListaBK"
            options={listas}
            getOptionLabel={(option) => option.IdListaBK}
            onChange={(event, newValue) => {
              formik.setFieldValue("IdListaBK", newValue ? newValue.IdListaBK : "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdListaBK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdListaBK && Boolean(formik.errors.IdListaBK)
                }
                helperText={formik.touched.IdListaBK && formik.errors.IdListaBK}
              />
            )}
            value={
              listas.find(
                (option) => option.IdListaBK === formik.values.IdListaBK
              ) || null
            }
          />
          <TextField
            id="DesLista"
            label="DesLista*"
            value={formik.values.DesLista}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={formik.touched.DesLista && Boolean(formik.errors.DesLista)}
            helperText={formik.touched.DesLista && formik.errors.DesLista}
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
          <Autocomplete
            id="IdTipoListaOK"
            options={listas}
            getOptionLabel={(option) => option.IdTipoListaOK}
            onChange={(event, newValue) => {
              formik.setFieldValue("IdTipoListaOK", newValue ? newValue.IdTipoListaOK : "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdTipoListaOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdTipoListaOK &&
                  Boolean(formik.errors.IdTipoListaOK)
                }
                helperText={
                  formik.touched.IdTipoListaOK && formik.errors.IdTipoListaOK
                }
              />
            )}
            value={
              listas.find(
                (option) => option.IdTipoListaOK === formik.values.IdTipoListaOK
              ) || null
            }
          />
          <Autocomplete
            id="IdTipoGeneraListaOK"
            options={listas}
            getOptionLabel={(option) => option.IdTipoGeneraListaOK}
            onChange={(event, newValue) => {
              formik.setFieldValue("IdTipoGeneraListaOK", newValue ? newValue.IdTipoGeneraListaOK : "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdTipoGeneraListaOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdTipoGeneraListaOK &&
                  Boolean(formik.errors.IdTipoGeneraListaOK)
                }
                helperText={
                  formik.touched.IdTipoGeneraListaOK &&
                  formik.errors.IdTipoGeneraListaOK
                }
              />
            )}
            value={
              listas.find(
                (option) =>
                  option.IdTipoGeneraListaOK ===
                  formik.values.IdTipoGeneraListaOK
              ) || null
            }
          />
          <Autocomplete
            id="IdListaBaseOK"
            options={listas}
            getOptionLabel={(option) => option.IdListaBaseOK}
            onChange={(event, newValue) => {
              formik.setFieldValue("IdListaBaseOK", newValue ? newValue.IdListaBaseOK : "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdListaBaseOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdListaBaseOK &&
                  Boolean(formik.errors.IdListaBaseOK)
                }
                helperText={
                  formik.touched.IdListaBaseOK && formik.errors.IdListaBaseOK
                }
              />
            )}
            value={
              listas.find(
                (option) => option.IdListaBaseOK === formik.values.IdListaBaseOK
              ) || null
            }
          />
          <Autocomplete
            id="IdTipoFormulaOK"
            options={listas}
            getOptionLabel={(option) => option.IdTipoFormulaOK}
            onChange={(event, newValue) => {
              formik.setFieldValue("IdTipoFormulaOK", newValue ? newValue.IdTipoFormulaOK : "");
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdTipoFormulaOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdTipoFormulaOK &&
                  Boolean(formik.errors.IdTipoFormulaOK)
                }
                helperText={
                  formik.touched.IdTipoFormulaOK &&
                  formik.errors.IdTipoFormulaOK
                }
              />
            )}
            value={
              listas.find(
                (option) =>
                  option.IdTipoFormulaOK === formik.values.IdTipoFormulaOK
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
