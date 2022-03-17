import { createSlice } from "@reduxjs/toolkit";

import { MedicineInitialState } from "../interface/patient.interface";

const { data } = require("../medication.json");

let initialState: MedicineInitialState["medicine"] = {
  medicineTypes: data,
  searchKey: "",

  assignedMedicine: {},
};

const medicineSlice = createSlice({
  name: "medicine",
  initialState,
  reducers: {
    filterMedicine: (state, { payload }) => {
      state.searchKey = payload;
    },

    addMedicine: (
      state,
      { payload }: { payload: { patientId: string; medicineId: string } }
    ) => {
      const value = state.assignedMedicine[payload.patientId];
      if (value) {
        value.push(payload.medicineId);
      } else {
        state.assignedMedicine[payload.patientId] = [payload.medicineId];
      }
    },
    removeMedicine: (state, { payload }) => {
      const value = state.assignedMedicine[payload.patientId];
      state.assignedMedicine[payload.patientId] = value.filter(
        (anId) => anId !== payload.medicineId
      );
    },
  },
});

export const { filterMedicine, addMedicine, removeMedicine } =
  medicineSlice.actions;

export default medicineSlice.reducer;
