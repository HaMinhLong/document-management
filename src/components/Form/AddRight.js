import React, { useState, useEffect } from "react";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { Formik, Form } from "formik";
import { rightValidation } from "./Validation/rightValidation";
import TextField from "./Field/TextField";

import { useDispatch, useSelector } from "react-redux";
import { addRight, updateRight } from "../../redux/rights/rightsActions";

const AddRight = (props) => {
  const dispatch = useDispatch();

  const id = props.match.params.id && props.match.params.id;

  const rights = useSelector((state) => state.rights);
  const data =
    rights && rights.length > 0 && rights.find((right) => right.id === id);

  const [right, setRight] = useState(
    id && data
      ? {
          id: data.id,
          name: data.name,
          url: data.url,
        }
      : {
          id: Math.floor(Math.random() * 1000000000000000000).toString(),
          name: "",
          url: "",
        }
  );

  const handleSubmit = (values) => {
    if (id) {
      dispatch(updateRight(values));
    } else {
      dispatch(addRight(values));
    }
    props.history.push("/right");
  };

  return (
    <>
      <Banner2 title={[id ? "Cập nhật quyền" : "Thêm quyền"]} />
      <section className="add-form-container padding">
        <h1>{id ? "Cập nhật quyền :" : "Thêm quyền :"}</h1>
        {right && (
          <Formik
            initialValues={right}
            validationSchema={rightValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <TextField label="Tên quyền :" name="name" type="text" />
                <TextField label="Link :" name="url" type="text" />

                <input
                  type="submit"
                  value={id ? "Cập nhật quyền" : "Thêm quyền"}
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

export default AddRight;
