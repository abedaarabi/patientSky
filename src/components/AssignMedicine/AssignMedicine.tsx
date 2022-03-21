import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { MedicineInitialState } from "../../interface/patient.interface";
import {
  addMedicine,
  removeMedicine,
  filterMedicine,
} from "../../redux/medicineSlicer";
import { Button } from "../Button/Button";
import Navbar from "../Navbar/Navbar";
import "./AssignMedicine.scss";
export const AssignMedicine = () => {
  let { patientId } = useParams();
  const dispatch = useDispatch();

  const assignedMedicines = useSelector(
    ({ medicine }: MedicineInitialState) => {
      const filterMedicineResult =
        medicine.assignedMedicine[patientId as string];

      return filterMedicineResult || [];
    }
  );

  const medicineList = useSelector(({ medicine }: MedicineInitialState) => {
    const { medicineTypes } = medicine;
    if (!medicine.searchKey) {
      return medicineTypes;
    }

    return medicineTypes.filter((aMedicine) => {
      return aMedicine.nameFormStrength
        .toLowerCase()
        .includes(medicine.searchKey.toLowerCase());
    });
  });

  const searchKey = useSelector(
    ({ medicine }: MedicineInitialState) => medicine.searchKey
  );

  const handelChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    dispatch(filterMedicine(value));
  };

  const toggleMedicine = (medicineId: string) => {
    if (!patientId) return;
    const isAssigned = assignedMedicines.includes(medicineId);
    const func = isAssigned ? removeMedicine : addMedicine;
    dispatch(func({ patientId, medicineId }));
  };

  return (
    <>
      <Navbar
        onChange={handelChange}
        btnTitle="Home Page"
        link="/"
        placeholder="Search for medicine"
        value={searchKey}
      />
      <div className="assign-medicine-container">
        {medicineList.length === 0 ? (
          <p>No Medicine Found</p>
        ) : (
          <div className="medicine-list">
            {medicineList.map((medicine) => {
              const isAssigned = assignedMedicines.includes(medicine.id);

              return (
                <div key={medicine.id} className="medicine-item">
                  <p>{medicine.nameFormStrength}</p>
                  <div className="btn-medicine-item">
                    <Button
                      style={isAssigned ? { background: "#9e2a2b" } : {}}
                      onClick={() => toggleMedicine(medicine.id)}
                    >
                      {isAssigned ? "Remove Medicine" : " Assign Medicine"}
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};
