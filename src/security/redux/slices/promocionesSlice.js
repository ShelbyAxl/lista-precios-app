import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  PromocionesDataArr: [],
};
const PromocionesSlice = createSlice({
  name: "Promociones",
  initialState,
  reducers: {
    SET_ID_PROMOCIONES: (state, action) => {
      //state.PromocionesDataArr = action.payload.PromocionesDataArr;
      state.PromocionesDataArr = action.payload;
    },
  },
});
export const {
  SET_ID_PROMOCIONES,
  //ADD_PRODUCT_SELECTED,
  //SWITCH_STATE,
} = PromocionesSlice.actions;
export default PromocionesSlice.reducer;