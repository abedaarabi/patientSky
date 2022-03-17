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
  let { patientId } = useParams();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [birthday, setBirthday] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");

  const dispatch = useDispatch();
  const history = useNavigate();

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    const PId = patientId || uuidv4();

    const inputValues = {
      name,
      email,
      birthday,
      phoneNumber,
      id: PId,
    };

    const func = patientId ? editPatient : addPatient;
    dispatch(func(inputValues));

    history("/");
  };

  const result = patientId ? patients[patientId] : undefined;

  const btnName = patientId ? "Save" : "Add Patient";
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
          onChange={(e) => setName(e.target.value)}
          defaultValue={result?.name || ""}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          required
          id="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
          defaultValue={result?.email || ""}
        />
        <label htmlFor="birthday">Birthday:</label>
        <input
          type="date"
          id="birthday"
          placeholder="birthday"
          onChange={(e) => setBirthday(e.target.value)}
          defaultValue={result?.birthday || ""}
        />
        <label htmlFor="phone-number.">Phone Number: </label>
        <input
          type="number"
          required
          id="phone-number"
          placeholder="Phone Number"
          onChange={(e) => setPhoneNumber(e.target.value)}
          defaultValue={result?.phoneNumber || ""}
        />
        <Button type="submit">{btnName}</Button>
      </form>
      <div className="btn-container">
        <Button link="/">Cancel</Button>
      </div>
    </div>
  );
};

export default AddPatient;
