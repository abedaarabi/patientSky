import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./FormContainer.scss";

import { InitialState, PatientTypes } from "../../interface/patient.interface";
import formJSON from "./formElement.json";
import Input from "./Input";
import { FormElements } from "./interface.form";
import { Button } from "../Button/Button";
import { addPatient, editPatient } from "../../redux/patientSlicer";

const FormContainer = () => {
  let { patientId } = useParams();
  const { patients } = useSelector((state: InitialState) => state.patient);
  const [elements, setElements] = useState<FormElements | undefined>();

  const result = patientId ? patients[patientId] : undefined;
};

export default FormContainer;

// const obj = { name: { value: ''. type: 'text' }, age: { type}, birthday: ''}
// <FormX values={obj} />
//