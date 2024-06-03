import { configureStore } from "@reduxjs/toolkit";
import institutesSlice from "../slices/institutesSlice";
import rolesSlice from "../slices/rolesSlice";
import promocionesSlice from "../slices/promocionesSlice";
import negociosSlice from "../slices/negociosSlice";

const store = configureStore({
  reducer: {
    institutes: institutesSlice,
    roles: rolesSlice,
    promociones: promocionesSlice,
    negocios: negociosSlice, 
  },
});

export default store;
