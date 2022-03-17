import React, { useRef } from "react";
import "./AddPatient.scss";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

import { addPatient, editPatient } from "../../redux/patientSlicer";
import { InitialState } from "../../interface/patient.interface";
import { Button } from "../Button/Button";

const AddPatient = () => {
  const { patients } = useSelector((state: InitialState) => state.patient);

  const nameInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const emailInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const birthdayInputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const phoneNumberInputRef =
    useRef() as React.MutableRefObject<HTMLInputElement>;

  const dispatch = useDispatch();
  const history = useNavigate();
  let { patientId } = useParams();
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();

    let name = nameInputRef.current.value;
    const email = emailInputRef.current.value;
    const birthday = birthdayInputRef.current.value;
    const phoneNumber = phoneNumberInputRef.current.value;
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
          ref={nameInputRef}
          defaultValue={result?.name || ""}
        />
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          required
          id="email"
          placeholder="email"
          ref={emailInputRef}
          defaultValue={result?.email || ""}
        />
        <label htmlFor="birthday">Birthday:</label>
        <input
          type="date"
          id="birthday"
          placeholder="birthday"
          ref={birthdayInputRef}
          defaultValue={result?.birthday || ""}
        />
        <label htmlFor="phone-number.">Phone Number: </label>
        <input
          type="number"
          required
          id="phone-number"
          placeholder="Phone Number"
          ref={phoneNumberInputRef}
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
