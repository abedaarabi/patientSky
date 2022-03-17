import { configureStore } from "@reduxjs/toolkit";
import medicineSlice from "./medicineSlicer";
import patientSlice from "./patientSlicer";

console.log(medicineSlice);

export const store = configureStore({
  reducer: {
    patient: patientSlice,
    medicine: medicineSlice,
  },
});
//@ts-ignore
window.store = store;
