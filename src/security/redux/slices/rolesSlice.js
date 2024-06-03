import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rolesDataArr: [],
};
const rolesSlice = createSlice({
  name: "roles",
  initialState,
  reducers: {
    SET_ID_ROLES: (state, action) => {
      //state.institutesDataArr = action.payload.institutesDataArr;
      state.rolesDataArr = action.payload;
    },
  },
});
export const {
  SET_ID_ROLES,
  //ADD_PRODUCT_SELECTED,
  //SWITCH_STATE,
} = rolesSlice.actions;
export default rolesSlice.reducer;