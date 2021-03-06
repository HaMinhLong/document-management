import React, { useState, useEffect } from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

import Banner2 from "../../../layouts/Banner2";
import Footer2 from "../../../layouts/Footer2";

import {
  fetchDocument,
  changeStatus,
  changeDepartment,
} from "../../../redux/documents/documentsActions";
import { fetchOrganizational } from "../../../redux/organizational-structure/organizationalActions";
import { fetchSenders } from "../../../redux/sender/sendersActions";
import { fetchAllAssigned } from "../../../redux/assigned/assignedActions";
import ReactNotification from "react-notifications-component";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

const DocumentDetails = (props) => {
  const id = props.match.params.id;
  const employeeID = localStorage.getItem("employeeId");
  const groupID = localStorage.getItem("groupId");
  const [confirmChangeStatus, setConfirmChangeStatus] = useState(false);
  const [confirmChangeDepartment, setConfirmChangeDepartment] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();
  useEffect(() => {
    document.title = `TLU | ${document.name || ""}`;
    dispatch(fetchDocument(id));
    dispatch(fetchOrganizational());
    dispatch(fetchSenders());
    dispatch(fetchAllAssigned());
  }, []);

  const document = useSelector((state) => state.documents);
  const organizational = useSelector((state) => state.organizational);
  const senders = useSelector((state) => state.senders);
  const allAssigned = useSelector((state) => state.assigned);
  const [departmentId, setDepartmentId] = useState();

  const [status, setStatus] = useState("");
  const [department, setDepartment] = useState("");

  const changeStatusDocument = () => {
    dispatch(changeDepartment(id, departmentId));
    setDepartment(
      organizational &&
        organizational.length > 0 &&
        organizational.find((department) => department.id === departmentId) &&
        organizational.find((department) => department.id === departmentId).name
    );
    message === "duy???t v??n b???n"
      ? dispatch(changeStatus(document.id, "Ti???n h??nh"))
      : message === "ph??t h??nh v??n b???n"
      ? dispatch(changeStatus(document.id, "???? ho??n th??nh"))
      : message === "kh??ng x??c nh???n ho??n th??nh"
      ? dispatch(changeStatus(document.id, "Tr?????ng ph??ng th???c hi???n"))
      : message === "k???t th??c v??n b???n"
      ? dispatch(changeStatus(document.id, "???? ho??n th??nh"))
      : message === "y??u c???u x??c nh???n ho??n th??nh"
      ? dispatch(changeStatus(document.id, "X??c nh???n ho??n th??nh"))
      : message === "kh??ng duy???t y??u c???u c???a nh??n vi??n"
      ? dispatch(changeStatus(document.id, "Nh??n vi??n th???c hi???n"))
      : message === "duy???t y??u c???u c???a nh??n vi??n"
      ? dispatch(changeStatus(document.id, "Tr?????ng ph??ng th???c hi???n"))
      : dispatch(changeStatus(document.id, "Ch??? tr?????ng ph??ng duy???t"));
    message === "duy???t v??n b???n"
      ? setStatus("Ti???n h??nh")
      : message === "ph??t h??nh v??n b???n"
      ? setStatus("???? ho??n th??nh")
      : message === "kh??ng x??c nh???n ho??n th??nh"
      ? setStatus("Tr?????ng ph??ng th???c hi???n")
      : message === "k???t th??c v??n b???n"
      ? setStatus("???? ho??n th??nh")
      : message === "y??u c???u x??c nh???n ho??n th??nh"
      ? setStatus("X??c nh???n ho??n th??nh")
      : message === "kh??ng duy???t y??u c???u c???a nh??n vi??n"
      ? setStatus("Nh??n vi??n th???c hi???n")
      : message === "duy???t y??u c???u c???a nh??n vi??n"
      ? setStatus("Tr?????ng ph??ng th???c hi???n")
      : setStatus("Ch??? tr?????ng ph??ng duy???t");
    setConfirmChangeStatus(false);
    SuccessNoti();
    // window.history.back();
  };

  const SuccessNoti = () => {
    store.addNotification({
      title: "Th??nh c??ng",
      message: `${message} th??nh c??ng`,
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
      <Banner2 title={["Qu???n l?? v??n b???n", document.name || ""]} />

      <section className="details-page padding">
        <h1>Th??ng tin v??? v??n b???n {document.name} :</h1>
        {document && (
          <div className="information">
            <p>
              <span>T??n v??n b???n :</span> {document.name}
            </p>
            <p>
              <span>M?? t??? :</span> {document.description}
            </p>
            <p>
              <span>Tr???ng th??i :</span> {status ? status : document.status}
            </p>
            <p>
              <span>Lo???i v??n b???n :</span>{" "}
              {document.docTypeId === "167751611920858000"
                ? "V??n b???n th??ng b??o"
                : document.docTypeId === "39504437639007016"
                ? "V??n b???n ph??n c??ng"
                : "V??n b???n g???i l??n c???p tr??n"}
            </p>
            <p>
              <span>B??? ph???n: </span>
              {department
                ? department
                : (organizational &&
                    organizational.length > 0 &&
                    document &&
                    document.departmentId &&
                    organizational.find(
                      (dpm) => dpm.id === document.departmentId
                    ).name) ||
                  ""}
            </p>
            {document.senderId && (
              <p>
                <span>N??i ?????n: </span>
                {(senders &&
                  senders.length > 0 &&
                  document &&
                  document.senderId &&
                  senders.find((sender) => sender.id === document.senderId)
                    .name) ||
                  ""}
              </p>
            )}
            <p>
              <span>Ng??y t???o : </span> {moment(document.createdAt).format("L")}
            </p>
            <p>
              <span>C???p nh???t l???n cu???i: </span>{" "}
              {moment(document.updatedAt).format("L")}
            </p>
            <div className="button-container">
              {/* BAN GIAM HIEU  */}
              {groupID === "461341600943357060" &&
                document.docTypeId === "39504437639007016" &&
                document.status === "Ch??? duy???t" &&
                !status && (
                  <button
                    className="agree"
                    onClick={() => {
                      setMessage("duy???t v??n b???n");
                      setConfirmChangeDepartment(true);
                    }}
                  >
                    Duy???t
                  </button>
                )}

              {groupID === "461341600943357060" &&
                document.docTypeId === "167751611920858000" &&
                document.status !== "???? ho??n th??nh" &&
                !status && (
                  <button
                    className="agree"
                    onClick={() => {
                      setMessage("ph??t h??nh v??n b???n");
                      setConfirmChangeDepartment(true);
                    }}
                  >
                    Ph??t h??nh v??n b???n
                  </button>
                )}

              {groupID === "461341600943357060" &&
                document.docTypeId === "39504437639007016" &&
                document.status === "X??c nh???n ho??n th??nh" &&
                !status && (
                  <>
                    <button
                      className="disagree"
                      onClick={() => {
                        setMessage("kh??ng x??c nh???n ho??n th??nh");
                        setConfirmChangeStatus(true);
                      }}
                    >
                      Kh??ng x??c nh???n
                    </button>
                    <button
                      className="agree"
                      onClick={() => {
                        setMessage("k???t th??c v??n b???n");
                        setConfirmChangeStatus(true);
                      }}
                    >
                      K???t th??c v??n b???n
                    </button>
                  </>
                )}

              {/* TRUONG PHONG */}
              {groupID !== "461341600943357060" &&
                document.docTypeId === "39504437639007016" &&
                allAssigned &&
                allAssigned.length > 0 &&
                allAssigned.find(
                  (ass) =>
                    ass.employeeId === employeeID &&
                    ass.roleId === "012211823414054230"
                ) &&
                document.status === "Tr?????ng ph??ng th???c hi???n" &&
                !status && (
                  <>
                    <button
                      className="agree"
                      onClick={() => {
                        setMessage("y??u c???u x??c nh???n ho??n th??nh");
                        setConfirmChangeStatus(true);
                      }}
                    >
                      Y??u c???u x??c nh???n ho??n th??nh
                    </button>
                  </>
                )}
              {groupID !== "461341600943357060" &&
                document.docTypeId === "39504437639007016" &&
                allAssigned &&
                allAssigned.length > 0 &&
                allAssigned.find(
                  (ass) =>
                    ass.employeeId === employeeID &&
                    ass.roleId === "012211823414054230"
                ) &&
                document.status === "Ch??? tr?????ng ph??ng duy???t" &&
                !status && (
                  <>
                    <button
                      className="disagree"
                      onClick={() => {
                        setMessage("kh??ng duy???t y??u c???u c???a nh??n vi??n");
                        setConfirmChangeStatus(true);
                      }}
                    >
                      Kh??ng duy???t
                    </button>
                    <button
                      className="agree"
                      onClick={() => {
                        setMessage("duy???t y??u c???u c???a nh??n vi??n");
                        setConfirmChangeStatus(true);
                      }}
                    >
                      Duy???t y??u c???u c???a nh??n vi??n
                    </button>
                  </>
                )}
              {groupID !== "461341600943357060" &&
                document.docTypeId === "39504437639007016" &&
                allAssigned &&
                allAssigned.length > 0 &&
                allAssigned.find(
                  (ass) =>
                    ass.employeeId === employeeID &&
                    ass.roleId !== "012211823414054230"
                ) &&
                document.status === "Nh??n vi??n th???c hi???n" &&
                !status && (
                  <>
                    <button
                      className="agree"
                      onClick={() => {
                        setMessage("b??o c??o l??n tr?????ng ph??ng");
                        setConfirmChangeStatus(true);
                      }}
                    >
                      B??o c??o l??n tr?????ng ph??ng
                    </button>
                  </>
                )}
            </div>
          </div>
        )}
        <p onClick={() => window.history.back()}>Quay l???i trang tr?????c</p>
        {confirmChangeStatus && <span className="bg"></span>}
        {confirmChangeStatus && (
          <div className="delete-employee">
            <p>B???n c?? mu???n {message} kh??ng?</p>
            <div className="confirm">
              <button onClick={() => setConfirmChangeStatus(false)}>H???y</button>
              <button onClick={() => changeStatusDocument()}>X??c nh??n</button>
            </div>
          </div>
        )}
        {confirmChangeDepartment && (
          <div className="delete-employee">
            {(message === "duy???t v??n b???n" ||
              message === "ph??t h??nh v??n b???n") && (
              <>
                <div
                  style={{
                    display: "flex",
                    height: 40,
                    alignItems: "center",
                    marginBottom: 50,
                  }}
                >
                  <p style={{ paddingBottom: 0, marginRight: 20 }}>
                    L???a ch???n b??? ph???n:{" "}
                  </p>
                  <select
                    style={{
                      padding: "2px 10px 2px 15px",
                      cursor: "pointer",
                      borderRadius: 4,
                    }}
                    onClick={(e) => setDepartmentId(e.target.value)}
                  >
                    {organizational &&
                      organizational.length > 0 &&
                      organizational.map((data) => (
                        <option
                          key={data.id}
                          value={data.id}
                          style={{ cursor: "pointer" }}
                        >
                          {data.name}
                        </option>
                      ))}
                  </select>
                </div>
              </>
            )}
            <div className="confirm">
              <button onClick={() => setConfirmChangeDepartment(false)}>
                H???y
              </button>
              <button
                onClick={() => {
                  setConfirmChangeStatus(true);
                  setConfirmChangeDepartment(false);
                }}
              >
                Ti???p
              </button>
            </div>
          </div>
        )}
      </section>

      <Footer2 />
    </>
  );
};

export default DocumentDetails;
