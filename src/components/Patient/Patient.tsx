import React from "react";
import "./Patient.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faAngleRight, faAngleDown } from "@fortawesome/free-solid-svg-icons";
import {
  MedicineInitialState,
  PatientTypes,
} from "../../interface/patient.interface";

import { useDispatch, useSelector } from "react-redux";
import { deletePatient } from "../../redux/patientSlicer";

import { Button } from "../Button/Button";
const Patient = ({
  name,
  email,
  birthday,
  phoneNumber,
  id,
  medicineList,
}: PatientTypes) => {
  const [isHide, setIsHide] = React.useState(false);
  const arrow = isHide ? faAngleDown : faAngleRight;
  const dispatch = useDispatch();

  const { assignedMedicine, medicineTypes } = useSelector(
    ({ medicine }: MedicineInitialState) => medicine
  );
  console.log(assignedMedicine, medicineTypes, id);

  return (
    <div className="patient-container">
      <div className="patient-info-container">
        <p>Patient Details:</p>
        <ul>
          <li> Name: {name}</li>
          <li> Email:{email}</li>
          <li> Phone Number:{birthday}</li>
          <li> Birthday:{phoneNumber}</li>
        </ul>
      </div>
      <div className="assigned-medicine">
        <p>Assigned Medicine</p>
        <FontAwesomeIcon
          className="arrow"
          icon={arrow}
          size="lg"
          color={"red"}
          onClick={() => {
            setIsHide(!isHide);
          }}
        />
      </div>
      <div>
        {isHide && (
          <ul>
            <li>product 1 </li>
            <li>product 2 </li>
            <li>product 3 </li>
          </ul>
        )}
      </div>
      <div className="patient-btn-container">
        <Button link={`/edit/${id}`}>Edit</Button>

        <Button onClick={() => dispatch(deletePatient(id))}>Delete</Button>
        <Button link={`/Assign/${id}`}>Assign Medicine</Button>
      </div>
    </div>
  );
};

export default Patient;
