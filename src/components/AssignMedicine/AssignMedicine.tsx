import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MedicineInitialState } from "../../interface/patient.interface";
import { addMedicine, filterMedicine } from "../../redux/medicineSlicer";
import { Button } from "../Button/Button";
import Navbar from "../Navbar/Navbar";
import "./AssignMedicine.scss";
export const AssignMedicine = () => {
  let { patientId } = useParams();

  const medicineList = useSelector(({ medicine }: MedicineInitialState) => {
    const filterMedicineResult = medicine.medicineTypes.filter((aMedicine) => {
      return aMedicine.nameFormStrength
        .toLowerCase()
        .includes(medicine.searchKey.toLowerCase());
    });

    return filterMedicineResult;
  });

  const dispatch = useDispatch();

  const handelChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    dispatch(filterMedicine(value));
  };

  const assignMedicine = () => {
    const resultIds = medicineList.map((id) => id.id);

    dispatch(addMedicine({ patientId, resultIds }));
  };

  // const removeMedicine = (medicineId: string) => {
  //   dispatch(removeMedicine(medicineId));
  // };

  return (
    <>
      <Navbar
        onChange={handelChange}
        btnTitle="Home Page"
        link="/"
        placeholder="Search for medicine"
      />
      <div className="assign-medicine-container">
        <div>
          <Button onClick={assignMedicine}> Assign Medicine</Button>
          {/* <Button onClick={() => removeMedicine(medicine.id)}>Remove</Button> */}
        </div>
        <div>
          {medicineList.length === 0 ? (
            <p>No Medicine Found</p>
          ) : (
            <ul>
              {medicineList.map((medicine) => (
                <li key={medicine.id}>{medicine.nameFormStrength}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};
