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
const Patient = ({ name, email, birthday, phoneNumber, id }: PatientTypes) => {
  const [isHide, setIsHide] = React.useState(false);
  const arrow = isHide ? faAngleDown : faAngleRight;
  const dispatch = useDispatch();

  const patientMedicines = useSelector(({ medicine }: MedicineInitialState) => {
    const { assignedMedicine, medicineTypes } = medicine;

    const ids = assignedMedicine[id as string] || [];
    return ids.map((anId) =>
      medicineTypes.find((medicine) => medicine.id === anId)
    );
  });

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

      <div>
        {patientMedicines.length === 0 ? null : (
          <div>
            <div className="assigned-medicine">
              <p>Assigned Medicine</p>
              <FontAwesomeIcon
                className="arrow"
                icon={arrow}
                size="lg"
                color={"#bc4555"}
                onClick={() => {
                  setIsHide(!isHide);
                }}
              />
            </div>
            <div>
              {isHide && (
                <ul>
                  {patientMedicines.map((medicine) => (
                    <li key={medicine?.id}>{medicine?.nameFormStrength} </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        )}
        <div className="patient-btn-container">
          <Button link={`/edit/${id}`}>Edit</Button>

          <Button onClick={() => dispatch(deletePatient(id))}>Delete</Button>
          <Button link={`/Assign/${id}`}>Medicines</Button>
        </div>
      </div>
    </div>
  );
};

export default Patient;
