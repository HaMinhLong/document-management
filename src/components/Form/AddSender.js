import React, { useState, useEffect } from "react";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { Formik, Form } from "formik";
import { senderValidation } from "./Validation/senderValidation";
import TextField from "./Field/TextField";

import { useDispatch, useSelector } from "react-redux";
import { addSender, updateSender } from "../../redux/sender/sendersActions";

const AddSender = (props) => {
  const dispatch = useDispatch();

  const id = props.match.params.id && props.match.params.id;

  const senders = useSelector((state) => state.senders);
  const data =
    senders && senders.length > 0 && senders.find((sender) => sender.id === id);

  const [sender, setRight] = useState(
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
      dispatch(updateSender(values));
    } else {
      dispatch(addSender(values));
    }
    props.history.push("/sender");
  };

  return (
    <>
      <Banner2 title={[id ? "Cập nhật nơi đến" : "Thêm nơi đến"]} />
      <section className="add-form-container padding">
        <h1>{id ? "Cập nhật nơi đến :" : "Thêm nơi đến :"}</h1>
        {sender && (
          <Formik
            initialValues={sender}
            validationSchema={senderValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <TextField label="Tên nơi đến :" name="name" type="text" />

                <input
                  type="submit"
                  value={id ? "Cập nhật nơi đến" : "Thêm nơi đến"}
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
