import React from "react";
import { ErrorMessage, useField } from "formik";

const TextField = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label htmlFor={field.name}>{label}</label>
      <textarea
        className={`${meta.touched && meta.error && "invalid"}`}
        {...field}
        {...props}
      ></textarea>
      <ErrorMessage
        component="div"
        name={field.name}
        className="error-message"
      />
    </>
  );
};

export default TextField;
