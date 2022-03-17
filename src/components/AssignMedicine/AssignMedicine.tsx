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

  const assignMedicine = (medicineId: string) => {
    // const resultIds = medicineList.map((id) => id.id);

    dispatch(addMedicine({ patientId, medicineId }));
  };

  const removeMedicine = (medicineId: string) => {
    console.log(medicineId);

    // dispatch(removeMedicine(medicineId));
  };

  return (
    <>
      <Navbar
        onChange={handelChange}
        btnTitle="Home Page"
        link="/"
        placeholder="Search for medicine"
      />
      <div className="assign-medicine-container">
        {medicineList.length === 0 ? (
          <p>No Medicine Found</p>
        ) : (
          <div className="medicine-list">
            {medicineList.map((medicine) => (
              <div key={medicine.id} className="medicine-item">
                <p>{medicine.nameFormStrength}</p>
                <div className="btn-medicine-item">
                  <Button onClick={() => assignMedicine(medicine.id)}>
                    Assign Medicine
                  </Button>
                  <Button onClick={() => removeMedicine(medicine.id)}>
                    Remove
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};
