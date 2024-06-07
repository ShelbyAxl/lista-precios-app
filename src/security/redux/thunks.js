//NOTA: Este archivo contiene funciones ASYNCRONAS
//que nos ayuda a obtener la respuesta del servidor
//y poder mandarla al SLICE y a su estado
import { SET_ID_INSTITUTES } from "./slices/institutesSlice";
import { SET_ID_ROLES } from "./slices/rolesSlice";
import { SET_ID_PROMOCIONES } from "./slices/promocionesSlice";

export const GET_DATA_START = () => {
  return async (dispatch, getState) => {
    dispatch(SET_ID_INSTITUTES());
  };
};

export const GET_DATA_ROLES = () => {
  return async (dispatch, getState) => {
    dispatch(SET_ID_ROLES());
  };
};

export const GET_DATA_PROMOCIONES = () => {
  return async (dispatch, getState) => {
    dispatch(SET_ID_PROMOCIONES());
  };
}
// 