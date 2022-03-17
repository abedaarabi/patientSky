import React, { useEffect } from "react";
import { InputElements } from "./interface.form";

const Input = ({ field, helper }: InputElements) => {
  const { field_label, field_placeholder, field_value, field_id, field_type } =
    field;
  const handleChange = (
    field_id: string,
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const { value } = event.currentTarget;
    helper(field_id, value);
  };



  return (
    <>
      <label htmlFor={field_id} className="form-label">
        {field_label}
      </label>
      <input
        type={field_type}
        id={field_id}
        name={field_id}
        aria-describedby={field_placeholder}
        placeholder={field_placeholder}
        defaultValue={field_value || ""}
        onChange={(event) => handleChange(field_id, event)}
      />
    </>
  );
};

export default Input;
