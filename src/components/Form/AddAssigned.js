import React, { useState, useEffect } from "react";

import Banner2 from "../layout/Banner2";
import Footer2 from "../layout/Footer2";

import { Formik, Form } from "formik";
import { assignedValidation } from "./Validation/assignedValidation";
import TextField from "./Field/TextField";
import SelectField from "./Field/SelectField";

import { useDispatch, useSelector } from "react-redux";

import {
  addAssigned,
  updateAssigned,
} from "../../redux/assigned/assignedActions";
import {
  fetchEmployees,
  fetchEmployeesByDep,
} from "../../redux/employees/employeesActions";
import { fetchRoles } from "../../redux/roles/rolesActions";
import {
  fetchAllDocuments,
  fetchDocumentsByDep,
} from "../../redux/documents/documentsActions";
import { changeStatus } from "../../redux/documents/documentsActions";

const AddAssigned = (props) => {
  document.title = "TLU | Thêm phân công";
  const id = props.match.params.id && props.match.params.id;
  const dispatch = useDispatch();
  const groupId = localStorage.getItem("groupId");
  const departmentID = localStorage.getItem("departmentId");
  const employeeID = localStorage.getItem("employeeId");

  // 644317359247429400 admin
  // 461341600943357060 ban_giam_hieu
  // 222908158858354780 hanh_chinh

  useEffect(() => {
    (groupId && groupId === "644317359247429400") ||
    groupId === "461341600943357060" ||
    groupId === "222908158858354780"
      ? dispatch(fetchEmployees())
      : dispatch(fetchEmployeesByDep(departmentID));

    dispatch(fetchRoles());
    dispatch(fetchAllDocuments());
  }, []);

  const employees = useSelector((state) => state.employees);
  const roles = useSelector((state) => state.roles);
  const documents = useSelector((state) => state.documents);

  const allAssigned = useSelector((state) => state.assigned);

  const data =
    allAssigned &&
    allAssigned.length > 0 &&
    allAssigned.find((assigned) => assigned.id === id);

  const [assigned, setAssigned] = useState(
    id && data
      ? {
          id: data.id,
          employeeId: data.employeeId,
          documentId: data.documentId,
          roleId: data.roleId,
        }
      : {
          id: Math.floor(Math.random() * 1000000000000000000).toString(),
          employeeId: "",
          documentId: "",
          roleId: "",
        }
  );

  const handleSubmit = (values) => {
    values.employeeId = assigned.employeeId;
    values.roleId = assigned.roleId;
    values.documentId = assigned.documentId;
    if (id) {
      dispatch(updateAssigned(values));
      props.history.push("/assigned");
    } else {
      dispatch(addAssigned(values));
      props.history.push("/assigned");
    }
    groupId === "644317359247429400" ||
    groupId === "461341600943357060" ||
    groupId === "222908158858354780"
      ? dispatch(changeStatus(assigned.documentId, "Trưởng phòng thực hiện"))
      : dispatch(changeStatus(assigned.documentId, "Nhân viên thực hiện"));
  };

  // Ham nay khong de lam gi
  const handleChange = (value) => {
    const employeeValue =
      employees &&
      employees.length > 0 &&
      employees.find((employee) => employee.name === value);
    employeeValue &&
      setAssigned({
        ...assigned,
        employeeId: employeeValue.id,
      });
  };

  const handleChangeDocument = (value) => {
    const documentValue =
      documents &&
      documents.length > 0 &&
      documents.find((document) => document.name === value);
    documentValue &&
      setAssigned({
        ...assigned,
        documentId: documentValue.id,
      });
  };

  const handleChangeRole = (value) => {
    const roleValue =
      roles &&
      roles.length > 0 &&
      roles.find((role) => role.role_name === value);
    roleValue &&
      setAssigned({
        ...assigned,
        roleId: roleValue.id,
      });
  };

  return (
    <>
      <Banner2 title={[id ? "Cập nhật phân công" : "Thêm phân công"]} />
      <section className="add-form-container padding">
        <h1>{[id ? "Cập nhật phân công" : "Thêm phân công"]}</h1>

        {assigned && (
          <Formik
            initialValues={assigned}
            validationSchema={assignedValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form>
                <SelectField
                  label="Văn bản :"
                  name="documentId"
                  optionsData={
                    documents && documents.length > 0
                      ? documents.filter(
                          (document) =>
                            document.status !== "Chờ duyệt" &&
                            document.status !== "Từ chối" &&
                            document.status !== "Đã hoàn thành"
                        )
                      : [{ name: "" }]
                  }
                  onChange={handleChangeDocument}
                />

                <SelectField
                  label="Nhân viên :"
                  name="employeeId"
                  optionsData={
                    employees && employees.length > 0
                      ? employees.filter(
                          (employee) => employee.id !== employeeID
                        )
                      : [{ name: "" }]
                  }
                  onChange={handleChange}
                />

                <SelectField
                  label="Vai trò :"
                  name="roleId"
                  optionsData={
                    (groupId === "644317359247429400" ||
                      groupId === "461341600943357060" ||
                      groupId === "222908158858354780") &&
                    roles &&
                    roles.length > 0
                      ? roles
                      : [{ name: "Nhân viên" }]
                  }
                  onChange={handleChangeRole}
                />

                <input
                  type="submit"
                  value={[id ? "Cập nhật phân công" : "Thêm phân công"]}
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

export default AddAssigned;
