import React, { useState, useEffect } from "react";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { Formik, Form } from "formik";
import { groupRightValidation } from "./Validation/groupRightValidation";
import SelectField from "./Field/SelectField";

import { useDispatch, useSelector } from "react-redux";
import { fetchRights } from "../../redux/rights/rightsActions";
import { fetchGroups } from "../../redux/groups/groupsActions";
import { addGroupRight } from "../../redux/group-rights/groupRightsActions";

import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const AddGroupRight = (props) => {
  document.title = "TLU | Cấp quyền";

  const dispatch = useDispatch();
  const groupRightID = props.match.params.id && props.match.params.id;

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchRights());
  }, []);

  const groups = useSelector((state) => state.groups);
  const rights = useSelector((state) => state.rights);

  const [groupRight, setGroupRight] = useState({
    id: Math.floor(Math.random() * 1000000000000000000).toString(),
    groupId: "",
    rightId: [],
  });

  const handleSubmit = (values) => {
    values.groupId = groupRight.groupId;
    values.rightId = groupRight.rightId;

    console.log(
      values.rightId.map((value) => {
        const data = {
          id: Math.floor(Math.random() * 1000000000000000000).toString(),
          groupId: values.groupId,
          rightId: value,
        };
        dispatch(addGroupRight(data));
      })
    );
    props.history.push("/group-right");
  };

  const handleChange = (value) => {
    const groupValue = groups.find((group) => group.name === value);
    groupValue &&
      groupValue.id &&
      setGroupRight({
        ...groupRight,
        groupId: groupValue.id,
      });
  };

  const handleChangeRight = (rightID) => {
    setGroupRight({
      ...groupRight,
      rightId: [...groupRight.rightId, rightID],
    });
  };

  // Thong bao
  const SuccessNoti = () => {
    store.addNotification({
      title: !groupRightID ? "Quyền mới được cấp" : "Quyền được cập nhật",
      message: !groupRightID
        ? "Cấp quyền thành công"
        : "Cập nhật thông tin quyền thành công",
      type: "success",
      container: "top-right",
      insert: "top",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 4000,
        showIcon: true,
        onScreen: true,
      },
      width: 350,
    });
  };

  return (
    <>
      <ReactNotification />
      <Banner2 title={[groupRightID ? "Cập nhật nhóm quyền" : "Cấp quyền"]} />

      <section className="add-form-container padding">
        <h1>{[groupRightID ? "Cập nhật nhóm quyền: " : "Cấp quyền: "]}</h1>

        {groupRight && (
          <Formik
            initialValues={groupRight}
            validationSchema={groupRightValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <SelectField
                  label="Chức vụ :"
                  name="groupId"
                  optionsData={
                    groups && groups.length > 0
                      ? groups.filter((group) => group.name !== "admin")
                      : [{ name: "" }]
                  }
                  onChange={handleChange}
                />

                <label htmlFor="">Chọn quyền: </label>
                {rights &&
                  rights.length > 0 &&
                  rights.map((right) => (
                    <div key={right.id} className="checkbox">
                      <input
                        type="checkbox"
                        id={right.name}
                        name="rightId"
                        value={right.id}
                        onChange={(e) => handleChangeRight(e.target.value)}
                      />
                      <label htmlFor={right.name}>{right.name}</label>
                    </div>
                  ))}

                <input
                  type="submit"
                  value={groupRightID ? "Cập nhật nhóm quyền" : "Cấp quyền"}
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

export default AddGroupRight;
