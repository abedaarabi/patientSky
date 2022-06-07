import { configureStore } from "@reduxjs/toolkit";

import medicineSlice from "./medicineSlicer";
import patientSlice from "./patientSlicer";

export const store = configureStore({
  reducer: {
    patient: patientSlice,
    medicine: medicineSlice,
  },
});

//export DISPATCH type and State Type.
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
