import React, { useEffect, useState } from "react";

import Banner2 from "../../layouts/Banner2";
import Footer2 from "../../layouts/Footer2";

import { Formik, Form } from "formik";
import { documentValidation } from "./Validation/documentValidation";
import TextField from "./Field/TextField";
import Textarea from "./Field/TextareaField";
import SelectField from "./Field/SelectField";
import FileBase64 from "./Field/FileBase64";

import { useDispatch, useSelector } from "react-redux";
import {
  updateDocument,
  addDocument,
} from "../../redux/documents/documentsActions";
import { fetchOrganizational } from "../../redux/organizational-structure/organizationalActions";
import { fetchSenders } from "../../redux/sender/sendersActions";
import { fetchDocTypes } from "../../redux/docType/docTypesActions";
import { fetchAllAssigned } from "../../redux/assigned/assignedActions";
import { checkAdmin } from "../../utils/utils";

const AddDocument = (props) => {
  const id = props.match.params.id && props.match.params.id;
  const dispatch = useDispatch();

  const groupId = localStorage.getItem("groupId");
  const employeeID = localStorage.getItem("employeeId");
  const departmentID = localStorage.getItem("departmentId");

  const isAdmin = checkAdmin(groupId);

  const documents = useSelector((state) => state.documents);
  const data =
    documents &&
    documents.length > 0 &&
    documents.find((document) => document.id === id);

  useEffect(() => {
    dispatch(fetchOrganizational());
    dispatch(fetchSenders());
    dispatch(fetchDocTypes());
    dispatch(fetchAllAssigned());
  }, []);
  const allDepartment = useSelector((state) => state.organizational);
  const senders = useSelector((state) => state.senders);
  const docTypes = useSelector((state) => state.docTypes);
  const allAssigned = useSelector((state) => state.assigned);

  const [document, setDocument] = useState(
    id && data
      ? {
          id: data.id,
          code: data.code,
          name: data.name,
          description: data.description,
          status: data.status,
          // data: data.data,
          docTypeId: data.docTypeId,
          employeeId: data.employeeId,
          departmentId: data.departmentId,
          senderId: data.senderId,
        }
      : {
          id: Math.floor(Math.random() * 1000000000000000000).toString(),
          code: "",
          name: "",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          status: "Ch??? duy???t",
          // data: "",
          docTypeId: "",
          employeeId: employeeID,
          departmentId: "839088048246208000",
          senderId: "762529812354761200",
        }
  );

  const handleSubmit = (values) => {
    values.departmentId = document.departmentId;
    values.docTypeId = document.docTypeId;
    values.senderId = document.senderId;
    if (id) {
      dispatch(updateDocument(values));
    } else {
      dispatch(addDocument(values));
    }
    props.history.push(
      props.match.url === "/add-incoming-document"
        ? "/incoming-document"
        : "/internal-document"
    );
  };

  const handleChangeDepartment = (value) => {
    const departmentValue = allDepartment.find(
      (proccess) => proccess.name === value
    );
    departmentValue &&
      departmentValue.id &&
      setDocument({
        ...document,
        departmentId: departmentValue.id,
      });
  };

  const handleChangeType = (value) => {
    const docTypeValue = docTypes.find((docType) => docType.name === value);
    docTypeValue &&
      docTypeValue.id &&
      setDocument({
        ...document,
        docTypeId: docTypeValue.id,
      });
  };

  const handleChangeSender = (value) => {
    const senderValue = senders.find((sender) => sender.name === value);
    senderValue &&
      senderValue.id &&
      setDocument({
        ...document,
        senderId: senderValue.id,
      });
  };

  // const onChangeFile = (e) => {
  //   setDocument({
  //     ...document,
  //     data: e.target.value,
  //   });
  // };

  const onChange = () => {};

  return (
    <>
      <Banner2 title={[id ? "C???p nh???t v??n b???n" : "Th??m v??n b???n"]} />
      <section className="add-form-container padding">
        <h1>{[id ? "C???p nh???t v??n b???n" : "Th??m v??n b???n"]}</h1>

        {document && (
          <Formik
            initialValues={document}
            validationSchema={documentValidation}
            onSubmit={(values) => handleSubmit(values)}
          >
            {(formik) => (
              <Form id="myForm" name="myForm">
                <TextField label="M?? v??n b???n :" name="code" type="text" />
                <TextField label="T??n v??n b???n :" name="name" type="text" />
                <Textarea label="M?? t??? :" name="description" type="text" />
                <SelectField
                  label="Tr???ng th??i :"
                  name="status"
                  id="status"
                  optionsData={
                    isAdmin
                      ? [
                          { name: "Ch??? duy???t" },
                          { name: "T??? ch???i" },
                          { name: "Ti???n h??nh" },
                          { name: "Tr?????ng ph??ng th???c hi???n" },
                          { name: "Nh??n vi??n th???c hi???n" },
                          { name: "Ch??? tr?????ng ph??ng duy???t" },
                          { name: "X??c nh???n ho??n th??nh" },
                          { name: "???? ho??n th??nh" },
                        ]
                      : (employeeID === document.employeeId ||
                          (allAssigned &&
                            allAssigned.length > 0 &&
                            allAssigned.find(
                              (ass) =>
                                ass.documentId === document.id &&
                                ass.employeeId === employeeID
                            )) ||
                          document.departmentId === departmentID) &&
                        document.status === "Ti???n h??nh"
                      ? [{ name: "X??c nh???n ho??n th??nh" }]
                      : [{ name: document.status }]
                  }
                  onChange={onChange}
                />

                <SelectField
                  label="Lo???i v??n b???n :"
                  name="docTypeId"
                  id="docTypeId"
                  optionsData={
                    docTypes && docTypes.length > 0 ? docTypes : [{ name: "" }]
                  }
                  onChange={handleChangeType}
                />
                {(!isAdmin && document.status !== "Ch??? duy???t") ||
                  (isAdmin && (
                    <SelectField
                      label="B??? ph???n :"
                      name="departmentId"
                      id="departmentId"
                      optionsData={
                        allDepartment && allDepartment.length > 0
                          ? allDepartment
                          : [{ name: "" }]
                      }
                      onChange={handleChangeDepartment}
                    />
                  ))}
                {props.match.url === "/add-incoming-document" && (
                  <SelectField
                    label="N??i ?????n :"
                    name="senderId"
                    id="senderId"
                    optionsData={
                      senders && senders.length > 0 ? senders : [{ name: "" }]
                    }
                    onChange={handleChangeSender}
                  />
                )}

                {/* 
                <input
                  type="file"
                  id="data"
                  name="data"
                  onChange={(e) => onChangeFile(e)}
                /> */}

                {/* <FileBase64
                  name="data"
                  id="data"
                  data={document}
                  setData={setDocument}
                /> */}

                <input
                  type="submit"
                  value={[id ? "C???p nh???t v??n b???n" : "Th??m v??n b???n"]}
                />
              </Form>
            )}
          </Formik>
        )}

        <p onClick={() => window.history.back()}>Quay l???i trang tr?????c</p>
      </section>
      <Footer2 />
    </>
  );
};

export default AddDocument;
