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

  useEffect(() => {
    setElements(formJSON as FormElements);
  }, []);

  const { fields, page_label } = elements ?? {};
  const dispatch = useDispatch();
  const history = useNavigate();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    console.log(elements?.fields);

    const PId = patientId || uuidv4();

    let inputValues = {
      id: PId,
    } as PatientTypes;

    elements?.fields.forEach((input) => {
      switch (input.field_id) {
        case "name":
          inputValues.name = input.field_value;
          break;
        case "email":
          inputValues.email = input.field_value;
          break;
        case "birthday":
          inputValues.birthday = input.field_value;
          break;
        case "phone_number":
          inputValues.phoneNumber = input.field_value;
          break;

        default:
          break;
      }
    });

    console.log(inputValues);

    dispatch(addPatient(inputValues));
    // if (patientId) {
    //   dispatch(editPatient(inputValues));
    // } else {
    //   dispatch(addPatient(inputValues));
    // }

    history("/");
  };

  const helper = (id: string, value: string) => {
    const updatedValue = { ...elements };

    updatedValue.fields?.forEach((field) => {
      const { field_id } = field;

      if (field_id === id) {
        field["field_value"] = value;
      }
      switch (field_id) {
        case "name":
          //@ts-ignore
          field["field_value"] = result?.name;
          break;
        case "email":
          //@ts-ignore
          field["field_value"] = result?.email;
          break;
        case "birthday":
          //@ts-ignore
          field["field_value"] = result?.birthday;
          break;
        case "phone_number":
          //@ts-ignore
          field["field_value"] = result?.phoneNumber;
          break;

        default:
          //TODO:
          //@ts-ignore
          field as any;
          break;
      }
      setElements(updatedValue as FormElements);
    });
  };
  const btnName = patientId ? "Save" : "Add Patient";
  return (
    <div className="form-container">
      <h3>{page_label}</h3>
      <form onSubmit={handleSubmit}>
        {fields
          ? fields.map((field: any) => (
              <Input key={field.field_id} field={field} helper={helper} />
            ))
          : null}
        <Button type="submit">{btnName}</Button>
      </form>
      <div className="btn-container">
        <Button link="/">Cancel</Button>
      </div>
    </div>
  );
};

export default FormContainer;
