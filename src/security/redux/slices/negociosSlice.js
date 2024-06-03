import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  NegociosDataArr: [],
};
const NegociosSlice = createSlice({
  name: "Negocios",
  initialState,
  reducers: {
    SET_ID_Negocios: (state, action) => {
      //state.NegociosDataArr = action.payload.NegociosDataArr;
      state.NegociosDataArr = action.payload;
    },
  },
});
export const {
  SET_ID_Negocios,
  //ADD_PRODUCT_SELECTED,
  //SWITCH_STATE,
} = NegociosSlice.actions;
export default NegociosSlice.reducer;