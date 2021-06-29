import React, { useState, useEffect } from "react";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { Formik, Form } from "formik";
import { proccessValidation } from "./Validation/proccessValidation";
import TextField from "./Field/TextField";
import Textarea from "./Field/TextareaField";
import SelectField from "./Field/SelectField";

import { useDispatch, useSelector } from "react-redux";
import {
  addProccess,
  updateProccess,
} from "../../redux/proccess/proccessActions";

const AddProccess = (props) => {
  const id = props.match.params.id && props.match.params.id;
  const dispatch = useDispatch();
  const employeeID = localStorage.getItem("employeeId")
    ? localStorage.getItem("employeeId")
    : null;

  const allProccess = useSelector((state) => state.proccess);
  const data =
    allProccess &&
    allProccess.length > 0 &&
    allProccess.find((proccess) => proccess.id === id);

  const [proccess, setProccess] = useState(
    id && data
      ? {
          id: data.id,
          name: data.name,
          description: data.description,
          status: data.status,
          employeeId: data.employeeId,
        }
      : {
          id: Math.floor(Math.random() * 1000000000000000000).toString(),
          name: "",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          status: "",
          employeeId: employeeID && employeeID,
        }
  );

  const handleSubmit = (values) => {
    values.employeeId = proccess.employeeId;
    if (id) {
      dispatch(updateProccess(values));
    } else {
      dispatch(addProccess(values));
    }
    props.history.push("/document-process");
    // console.log(values);
  };

  const onChange = () => {};

  return (
    <>
      <Banner2 title={[id ? "Cập nhật tiến trình" : "Thêm tiến trình"]} />
      <section className="add-form-container padding">
        <h1>{[id ? "Cập nhật tiến trình" : "Thêm tiến trình"]}</h1>

        {proccess && (
          <Formik
            initialValues={proccess}
            validationSchema={proccessValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <TextField label="Tên tiến trình :" name="name" type="text" />
                <Textarea label="Mô tả :" name="description" type="text" />

                <SelectField
                  label="Trạng thái :"
                  name="status"
                  id="status"
                  optionsData={[{ name: "Tiến hành" }, { name: "Kết thúc" }]}
                  onChange={onChange}
                />

                <input
                  type="submit"
                  value={[id ? "Cập nhật tiến trình" : "Thêm tiến trình"]}
                />
              </Form>
            )}
          </Formik>
        )}

        <p onClick={() => window.history.back()}>Quay lại trang trước</p>
      </section>
      <Footer2 />
    </>
  );
};

export default AddProccess;
