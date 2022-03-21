import React from "react";
import "./AddPatient.scss";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { addPatient, editPatient } from "../../redux/patientSlicer";
import { InitialState } from "../../interface/patient.interface";
import { Button } from "../Button/Button";

const AddPatient = () => {
  const { patients } = useSelector((state: InitialState) => state.patient);
  const dispatch = useDispatch();
  const history = useNavigate();
  let { patientId } = useParams();
  const PId = patientId || uuidv4();
  const result = patientId ? patients[patientId] : undefined;
  const [inputValues, setInputValues] = React.useState({
    name: result?.name || "",
    email: result?.email || "",
    birthday: result?.birthday || "",
    phoneNumber: result?.phoneNumber || "",
    id: PId,
  });

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const func = patientId ? editPatient : addPatient;

    dispatch(func(inputValues));

    history("/");
  };

  return (
    <div className="form-container">
      <h3>Add New Patient:</h3>
      <form onSubmit={submitHandler}>
        <label htmlFor="name">Name: </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          value={inputValues.name}
          onChange={(e) =>
            setInputValues({ ...inputValues, name: e.target.value })
          }
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          required
          id="email"
          placeholder="email"
          value={inputValues.email}
          onChange={(e) =>
            setInputValues({ ...inputValues, email: e.target.value })
          }
        />
        <label htmlFor="birthday">Birthday:</label>
        <input
          type="date"
          id="birthday"
          placeholder="birthday"
          value={inputValues.birthday}
          onChange={(e) =>
            setInputValues({ ...inputValues, birthday: e.target.value })
          }
        />
        <label htmlFor="phone-number.">Phone Number: </label>
        <input
          type="number"
          required
          id="phone-number"
          placeholder="Phone Number"
          value={inputValues.phoneNumber}
          onChange={(e) =>
            setInputValues({ ...inputValues, phoneNumber: e.target.value })
          }
        />
        <Button type="submit">{patientId ? "Save" : "Add Patient"}</Button>
      </form>
      <div className="btn-container">
        <Button link="/">Cancel</Button>
      </div>
    </div>
  );
};

export default AddPatient;
