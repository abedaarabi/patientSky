import faker from "@faker-js/faker";
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { InitialState } from "../interface/patient.interface";

function generatePatients(n: number) {
  let result: Omit<InitialState["patient"], "searchKey"> = {
    ids: [],
    patients: {},
  };
  for (let index = 0; index < n; index++) {
    // from stackoverflow
    const [m, d, y] = faker.date
      .past(55)
      .toLocaleDateString()
      .split("/")
      .map((s) => Number(s));
    const date = `${y}-${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}`;
    const obj = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      birthday: date,
      phoneNumber: faker.phone.phoneNumber("45######"),
      id: uuidv4(),
    };

    result.patients[obj.id] = obj;
    result.ids.push(obj.id);
  }

  return result;
}

const { ids, patients } = generatePatients(200);

let initialState: InitialState["patient"] = {
  patients,
  ids,
  searchKey: "",
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    addPatient: (state, { payload }) => {
      const newPatientRecord = { [payload.id]: payload };

      state.ids.push(payload.id);

      state.patients = { ...state.patients, ...newPatientRecord };
    },
    deletePatient: (state, { payload }) => {
      const patientId = payload;

      state.ids = state.ids.filter((id) => id !== patientId);
      delete state.patients[patientId];
    },

    filterPatients: (state, { payload }) => {
      state.searchKey = payload;
    },
    editPatient: (state, { payload }) => {
      state.patients[payload.id] = payload;
    },
  },
});


export const { addPatient, deletePatient, filterPatients, editPatient } =
  patientSlice.actions;

export default patientSlice.reducer;
