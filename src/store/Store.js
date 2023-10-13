import { configureStore } from "@reduxjs/toolkit";
import VocabSlice from "./reducers/VocabSlice";
import CategorySlice from "./reducers/CategorySlice";

export const store = configureStore({
  reducer: {
    vocab: VocabSlice,
    category: CategorySlice,
  },
});
