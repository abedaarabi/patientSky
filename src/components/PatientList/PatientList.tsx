import React from "react";
import Patient from "../Patient/Patient";
import "./PatientList.scss";
import { useDispatch, useSelector } from "react-redux";
import { InitialState } from "../../interface/patient.interface";
import Navbar from "../Navbar/Navbar";
import { filterPatients } from "../../redux/patientSlicer";
const PatientList = () => {
  const patients = useSelector(({ patient }: InitialState) => {
    const filterPatientsResult = Array.from(
      patient.ids,
      (aPatientKey) => patient.patients[aPatientKey]
    );

    if (!patient.searchKey) {
      return filterPatientsResult;
    }

    return filterPatientsResult.filter((aPatient) => {
      return aPatient.name
        .toLowerCase()
        .includes(patient.searchKey.toLowerCase());
    });
  });

  const searchKey = useSelector(
    (state: InitialState) => state.patient.searchKey
  );

  const dispatch = useDispatch();

  const handelChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    dispatch(filterPatients(value));
  };

  return (
    <>
      <Navbar
        onChange={handelChange}
        btnTitle="Add New Patient"
        link="/add"
        placeholder="Search for patient"
        value={searchKey}
      />

      <h3>{`Number of Patients: ${patients.length}`}</h3>
      <div className="patient-list-container">
        {patients.length === 0 ? (
          <p className="noData-msg">no patients data :/</p>
        ) : (
          patients.map((patient) => (
            <Patient
              key={patient.id}
              name={patient.name}
              birthday={patient.birthday}
              email={patient.email}
              phoneNumber={patient.phoneNumber}
              id={patient.id}
            />
          ))
        )}
      </div>
    </>
  );
};

export default PatientList;
