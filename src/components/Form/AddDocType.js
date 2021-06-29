import React, { useState, useEffect } from "react";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { Formik, Form } from "formik";
import { docTypeValidation } from "./Validation/docTypeValidation";
import TextField from "./Field/TextField";

import { useDispatch, useSelector } from "react-redux";
import { addDocType, updateDocType } from "../../redux/docType/docTypesActions";

const AddSender = (props) => {
  const dispatch = useDispatch();

  const id = props.match.params.id && props.match.params.id;

  const docTypes = useSelector((state) => state.docTypes);
  const data =
    docTypes &&
    docTypes.length > 0 &&
    docTypes.find((docType) => docType.id === id);

  const [docType, setDocType] = useState(
    id && data
      ? {
          id: data.id,
          name: data.name,
        }
      : {
          id: Math.floor(Math.random() * 1000000000000000000).toString(),
          name: "",
        }
  );

  const handleSubmit = (values) => {
    if (id) {
      dispatch(updateDocType(values));
    } else {
      dispatch(addDocType(values));
    }
    props.history.push("/doc-type");
  };

  return (
    <>
      <Banner2 title={[id ? "Cập nhật loại văn bản" : "Thêm loại văn bản"]} />
      <section className="add-form-container padding">
        <h1>{id ? "Cập nhật loại văn bản :" : "Thêm loại văn bản :"}</h1>
        {docType && (
          <Formik
            initialValues={docType}
            validationSchema={docTypeValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <TextField label="Tên loại văn bản :" name="name" type="text" />

                <input
                  type="submit"
                  value={id ? "Cập nhật loại văn bản" : "Thêm loại văn bản"}
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

export default AddSender;
