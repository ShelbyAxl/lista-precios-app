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
import { UpdateOneInstitute } from "../../services/remote/put/UpdateOneInstitute";
import { getOneInstitute } from "../../services/remote/get/getOneInstitute";
import { getInstitutes } from "../../services/remote/get/getInstitutes";
import { getAllInstitutes } from "../../services/remote/get/getAllInstitutes";

const UpdateInstituteModal = ({
  UpdateInstituteShowModal,
  setUpdateInstituteShowModal,
  instituteId,
  updateInstitutes,
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

  useEffect(() => {
    if (instituteId) {
      getInstituteData();
    }
  }, [instituteId]);

  async function getInstituteData() {
    try {
      const instituteData = await getOneInstitute(instituteId);
      formik.setValues({
        IdInstitutoOK: instituteData.IdInstitutoOK,
        IdListaOK: instituteData.IdListaOK,
        IdListaBK: instituteData.IdListaBK,
        DesLista: instituteData.DesLista,
        FechaExpiraIni: new Date(instituteData.FechaExpiraIni)
          .toISOString()
          .split("T")[0],
        FechaExpiraFin: new Date(instituteData.FechaExpiraFin)
          .toISOString()
          .split("T")[0],
        IdTipoListaOK: instituteData.IdTipoListaOK,
        IdTipoGeneraListaOK: instituteData.IdTipoGeneraListaOK,
        IdListaBaseOK: instituteData.IdListaBaseOK,
        IdTipoFormulaOK: instituteData.IdTipoFormulaOK,
      });
    } catch (e) {
      console.error("Error al obtener los datos del instituto:", e);
    }
  }

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
      setLoading(true);
      setMensajeErrorAlert(null);
      setMensajeExitoAlert(null);
      try {
        const Institute = InstituteValues(values);
        await UpdateOneInstitute(instituteId, Institute);
        setMensajeExitoAlert(
          "Instituto fue actualizado y guardado Correctamente"
        );
        try {
          await updateInstitutes();
        } catch (e) {
          console.error("Error updating institutes:", e);
        }
      } catch (e) {
        console.error("Error updating one institute:", e);
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
      open={UpdateInstituteShowModal}
      onClose={() => setUpdateInstituteShowModal(false)}
      fullWidth
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle>
          <Typography component="h6">
            <strong>Actualizar Instituto</strong>
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column" }}
          dividers
        >
          <Autocomplete
            id="IdInstitutoOK"
            options={institutes}
            getOptionLabel={(option) => option.IdInstitutoOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdInstitutoOK",
                newValue ? newValue.IdInstitutoOK : ""
              );
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
                disabled
              />
            )}
            value={
              institutes.find(
                (option) => option.IdInstitutoOK === formik.values.IdInstitutoOK
              ) || null
            }
            disabled
          />
          <Autocomplete
            id="IdListaOK"
            options={listas}
            getOptionLabel={(option) => option.IdListaOK}
            onChange={(event, newValue) => {
              formik.setFieldValue(
                "IdListaOK",
                newValue ? newValue.IdListaOK : ""
              );
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
              formik.setFieldValue(
                "IdListaBK",
                newValue ? newValue.IdListaBK : ""
              );
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
              formik.setFieldValue(
                "IdTipoListaOK",
                newValue ? newValue.IdTipoListaOK : ""
              );
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
              formik.setFieldValue(
                "IdTipoGeneraListaOK",
                newValue ? newValue.IdTipoGeneraListaOK : ""
              );
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
              formik.setFieldValue(
                "IdListaBaseOK",
                newValue ? newValue.IdListaBaseOK : ""
              );
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
            onClick={() => setUpdateInstituteShowModal(false)}
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
export default UpdateInstituteModal;
