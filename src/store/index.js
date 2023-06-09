import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice";
import cardSlice from "./card-slice";

const store = configureStore({
  reducer: { ui: uiSlice.reducer, card: cardSlice.reducer },
});

export default store;
