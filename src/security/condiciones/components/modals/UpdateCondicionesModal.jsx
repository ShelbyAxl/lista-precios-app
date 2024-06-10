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
import { CondicionesValues } from "../../helpers/CondicionesValues";
//FIC: Services
import { getOneCondiciones } from "../../services/remote/get/getOneCondiciones";
import { UpdateOneCondiciones } from "../../services/remote/put/UpdateOneCondiciones";
import { getCondiciones } from "../../services/remote/get/getCondiciones";
import { useSelector } from "react-redux";

const UpdateCondicionesModal = ({
  UpdateCondicionesShowModal,
  setUpdateCondicionesShowModal,
  instituteId,
  promotionId,
  selectedCondicionesId,
  updateCondiciones,
}) => {
  const ids = [instituteId, promotionId, selectedCondicionesId];
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

  useEffect(() => {
    if (selectedCondicionesId) {
      getCondicionesData();
    }
  }, [selectedCondicionesId]);

  async function getCondicionesData() {
    try {
      const CondicionesData = await getOneCondiciones(ids);
      console.log("Fetched Condiciones Data:", CondicionesData);
      formik.setValues({
        IdEtiquetaOK: CondicionesData.IdEtiquetaOK,
        Etiqueta: CondicionesData.Etiqueta,
        valor: CondicionesData.valor, 
        IdComparaValorOK: CondicionesData.IdComparaValorOK,
        IdOpComparaValoresOK: CondicionesData.IdOpComparaValoresOK,
        IdOpLogicoEtiquetaOK: CondicionesData.IdOpLogicoEtiquetaOK,
      });
    } catch (e) {
      console.error("Error al obtener los datos de la condición:", e);
    }
  }

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
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        const formattedValues = {
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
        await UpdateOneCondiciones(ids, formattedValues);
        setMensajeExitoAlert(
          "Condición fue actualizada y guardada correctamente"
        );
        updateCondiciones();
      } catch (e) {
        setMensajeExitoAlert(null);
        setMensajeErrorAlert("No se pudo actualizar la condición");
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
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Condición</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
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
        <DialogActions sx={{ display: "flex", flexDirection: "row" }}>
          <Box m="auto">
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
          <LoadingButton
            color="secondary"
            loadingPosition="start"
            startIcon={<CloseIcon />}
            variant="outlined"
            onClick={() => setUpdateCondicionesShowModal(false)}
          >
            <span>CERRAR</span>
          </LoadingButton>
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
