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

    addMedicine: (state, { payload }) => {
      console.log(payload);

      const newPatientRecord = {
        [payload.patientId]: [payload.medicineId],
      };

      state.assignedMedicine = {
        ...state.assignedMedicine,
        ...newPatientRecord,
      };
      console.log(state.assignedMedicine);
    },
    removeMedicine: (state, { payload }) => {},
  },
});

export const { filterMedicine, addMedicine, removeMedicine } =
  medicineSlice.actions;

export default medicineSlice.reducer;
