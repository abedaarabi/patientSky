import React from "react";

import "./App.scss";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AddPatient from "./components/AddPatient/AddPatient";
import PatientList from "./components/PatientList/PatientList";
import Navbar from "./components/Navbar/Navbar";
import { AssignMedicine } from "./components/AssignMedicine/AssignMedicine";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PatientList />} />
          <Route path="/add" element={<AddPatient />} />
          <Route path="/edit/:patientId" element={<AddPatient />} />
          <Route path="/Assign/:patientId" element={<AssignMedicine />} />

          <Route
            path="*"
            element={
              <main>
                <p>There's nothing here!</p>
              </main>
            }
          />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
