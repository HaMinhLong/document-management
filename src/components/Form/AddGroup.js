import React, { useState } from "react";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { Formik, Form } from "formik";
import { groupValidation } from "./Validation/groupValidation";
import TextField from "./Field/TextField";

import { useDispatch, useSelector } from "react-redux";
import { addGroup, updateGroup } from "../../redux/groups/groupsActions";

const AddGroup = (props) => {
  const dispatch = useDispatch();
  const groupID = props.match.params.id && props.match.params.id;

  const groupUpdate = useSelector((state) => state.groups);

  const data =
    groupUpdate &&
    groupUpdate.length > 0 &&
    groupUpdate.find((group) => group.id === groupID);

  const [group, setGroup] = useState(
    groupID && data
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
    if (groupID) {
      dispatch(updateGroup(values));
    } else {
      dispatch(addGroup(values));
    }
    props.history.push("/group");
  };

  return (
    <>
      <Banner2 title={[groupID ? "Cập nhật chức vụ" : "Thêm chức vụ"]} />
      <section className="add-form-container padding">
        <h1>{groupID ? "Cập nhật chức vụ: " : "Thêm chức vụ :"}</h1>
        {group && (
          <Formik
            initialValues={group}
            validationSchema={groupValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <TextField label="Tên chức vụ :" name="name" type="text" />

                <input
                  type="submit"
                  value={groupID ? "Cập nhật chức vụ" : "Thêm chức vụ"}
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

export default AddGroup;
