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
        {optionsData.map((option) => (
          <option key={option.name} value={option.name}>
            {option.name}
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
