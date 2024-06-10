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
import { AddOnePromociones } from "../../services/remote/post/AddOneInstitute";
import { getPromociones } from "../../services/remote/get/getPromociones";
import { useSelector } from "react-redux";
const AddPromocionesModal = ({
  AddPromocionesShowModal,
  setAddPromocionesShowModal,
}) => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);

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
      FechaExpiraIni: Yup.date().required("Campo requerido"),
      FechaExpiraFin: Yup.date()
        .required("Campo requerido")
        .min(
          Yup.ref("FechaExpiraIni"),
          "La fecha de fin no puede ser anterior a la fecha de inicio"
        ),
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
        const Promociones = PromocionesValues(values);
        //FIC: mandamos a consola los datos extraidos
        console.log("<<Promociones>>", Promociones);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOnePromociones" y que previamente
        //construye todo el JSON de la coleccion de Institutos para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await AddOnePromociones(instituto, Promociones);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        //fetchDataPromociones();
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
      open={AddPromocionesShowModal}
      onClose={() => setAddPromocionesShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography component="h6">
            <strong>Agregar Nuevo Promocion</strong>
          </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* FIC: Campos de captura o selección */}
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
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={formik.touched.DesPromo && Boolean(formik.errors.DesPromo)}
            helperText={formik.touched.DesPromo && formik.errors.DesPromo}
          />
          <TextField
            id="Formula"
            label="Formula*"
            value={formik.values.Formula}
            /* onChange={formik.handleChange} */
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
            onClick={() => setAddPromocionesShowModal(false)}
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
export default AddPromocionesModal;
