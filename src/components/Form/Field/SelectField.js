import React from "react";

import { ErrorMessage, useField } from "formik";

const SelectField = ({ label, optionsData, id, onChange, ...props }) => {
  const [field] = useField(props);
  return (
    <div>
      <label htmlFor={field.name}>{label}</label>
      <select
        {...field}
        {...props}
        value={field.value}
        id={id}
        onClick={() => onChange(field.value)}
      >
        <option value="">Select</option>
        {optionsData.map((option, index) => (
          <option key={index} value={option.name}>
            {option.name
              ? option.name
              : option.username
              ? option.username
              : option.role_name}
          </option>
        ))}
      </select>
      <ErrorMessage
        component="div"
        name={field.name}
        className="error-message"
      />
    </div>
  );
};

export default SelectField;
