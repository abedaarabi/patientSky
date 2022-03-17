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
    const obj = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      birthday: faker.date.past(55).toString(),
      phoneNumber: faker.phone.phoneNumber("501-###-###"),
      id: uuidv4(),
    };

    result.patients[obj.id] = obj;
    result.ids.push(obj.id);
  }

  return result;
}

// const patients = {
//   "75b9858f-09a2-4be9-afad-9a5b645f4cf9": {
//     birthday:
//       "Wed Mar 09 2022 13:01:54 GMT+0100 (Central European Standard Time)",
//     email: "Issac58@hotmail.com",
//     id: "75b9858f-09a2-4be9-afad-9a5b645f4cf9",
//     name: "Michael Price II",
//     phoneNumber: "71566389",
//   },
// };
//adds 200 patients
const { ids, patients } = generatePatients(8);

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
