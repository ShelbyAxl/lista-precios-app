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
import { PreciosValues } from "../../helpers/PrecioValues";
import { useSelector } from "react-redux";
//FIC: Formik - Yup
import { useFormik } from "formik";
import * as Yup from "yup";
//FIC: Helpers
// import { PrecioValues } from "../../helpers/PrecioValues";
//FIC: Services
// import { AddOnePrecio } from "../../services/remote/post/AddOnePrecio";
import { AddOnePrecio } from "../../services/remote/post/AddOnePrecio";
import { getPrecios } from "../../services/remote/get/getPrecios";
import { getAllInstitutes } from "../../../institutes/services/remote/get/getAllInstitutes";

const AddPrecioModal = ({ AddPrecioShowModal, setAddPrecioShowModal }) => {
  const instituto = useSelector((state) => state.institutes.institutesDataArr);
  console.log(instituto);

  const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
  const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");
  const [Loading, setLoading] = useState(false);
  const [productos, setProductos] = useState([]);
  const [listas, setListas] = useState([]);

  useEffect(() => {
    async function fetchInstitutes() {
      try {
        const productos = await getPrecios();
        setProductos(productos);
      } catch (error) {
        console.error("Error fetching precios:", error);
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
      IdProdServOK: "",
      PresentacionDelProducto: "",
      IdTipoFormulaOK: "",
      Formula: "",
      Precio: "",
    },
    validationSchema: Yup.object({
      IdProdServOK: Yup.string().required("Campo requerido"),
      PresentacionDelProducto: Yup.string().required("Campo requerido"),
      IdTipoFormulaOK: Yup.string().required("Campo requerido"),
      Formula: Yup.string().required("Campo requerido"),
      Precio: Yup.number().required("Campo requerido"),
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
        values.IdPresentaOK = "IdPresentaOK";
        values.Precio = parseInt(values.Precio);
        const Precio = PreciosValues(values);
        //FIC: mandamos a consola los datos extraidos
        console.log("<<Precio>>", Precio);
        //FIC: llamar el metodo que desencadena toda la logica
        //para ejecutar la API "AddOnePrecio" y que previamente
        //construye todo el JSON de la coleccion de Institutos para
        //que pueda enviarse en el "body" de la API y determinar si
        //la inserción fue o no exitosa.
        await AddOnePrecio(instituto, Precio);
        //FIC: si no hubo error en el metodo anterior
        //entonces lanzamos la alerta de exito.
        setMensajeExitoAlert("Instituto fue creado y guardado Correctamente");
        //FIC: falta actualizar el estado actual (documentos/data) para que
        //despues de insertar el nuevo instituto se visualice en la tabla.
        //fetchDataPrecio();
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
      open={AddPrecioShowModal}
      onClose={() => setAddPrecioShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        {/* FIC: Aqui va el Titulo de la Modal */}
        <DialogTitle>
          <Typography component="h6">
            <strong>Agregar Nuevo Precio</strong>
          </Typography>
        </DialogTitle>
        {/* FIC: Aqui va un tipo de control por cada Propiedad de Institutos */}
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          {/* FIC: Campos de captura o selección */}
          <Autocomplete
            id="IdProdServOK"
            options={productos}
            getOptionLabel={(option) => option.IdProdServOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdProdServOK",
                newValue ? newValue.IdProdServOK : ""
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="IdProdServOK*"
                {...commonTextFieldProps}
                error={
                  formik.touched.IdProdServOK &&
                  Boolean(formik.errors.IdProdServOK)
                }
                helperText={
                  formik.touched.IdProdServOK && formik.errors.IdProdServOK
                }
              />
            )}
            value={
              productos.find(
                (option) => option.IdProdServOK === formik.values.IdProdServOK
              ) || null
            }
          />
          <TextField
            id="PresentacionDelProducto"
            label="PresentacionDelProducto*"
            value={formik.values.PresentacionDelProducto}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={
              formik.touched.PresentacionDelProducto &&
              Boolean(formik.errors.PresentacionDelProducto)
            }
            helperText={
              formik.touched.PresentacionDelProducto &&
              formik.errors.PresentacionDelProducto
            }
          />
          <Autocomplete
            id="IdTipoFormulaOK"
            options={listas}
            getOptionLabel={(option) => option.IdTipoFormulaOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdTipoFormulaOK",
                newValue ? newValue.IdTipoFormulaOK : ""
              );
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
                  formik.touched.IdTipoFormulaOK && formik.errors.IdTipoFormulaOK
                }
              />
            )}
            value={
              listas.find(
                (option) => option.IdTipoFormulaOK === formik.values.IdTipoFormulaOK
              ) || null
            }
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
            id="Precio"
            label="Precio*"
            value={formik.values.Precio}
            /* onChange={formik.handleChange} */
            {...commonTextFieldProps}
            error={formik.touched.Precio && Boolean(formik.errors.Precio)}
            helperText={formik.touched.Precio && formik.errors.Precio}
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
            onClick={() => setAddPrecioShowModal(false)}
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
export default AddPrecioModal;
