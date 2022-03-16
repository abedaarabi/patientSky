import { configureStore } from "@reduxjs/toolkit";
import medicineSlicer from "./medicineSlicer";
import patientSlice from "./patientSlicer";
export const store = configureStore({
  reducer: {
    patient: patientSlice,
    medicine: medicineSlicer,
  },
});
