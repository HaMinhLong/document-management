import React, { useState, useEffect } from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

import Banner2 from "../../../layouts/Banner2";
import Footer2 from "../../../layouts/Footer2";

import {
  fetchDocument,
  changeStatus,
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

  const [status, setStatus] = useState("");

  const changeStatusDocument = () => {
    message === "duyệt văn bản"
      ? dispatch(changeStatus(document.id, "Tiến hành"))
      : message === "phát hành văn bản"
      ? dispatch(changeStatus(document.id, "Đã hoàn thành"))
      : message === "không xác nhận hoàn thành"
      ? dispatch(changeStatus(document.id, "Trưởng phòng thực hiện"))
      : message === "kết thúc văn bản"
      ? dispatch(changeStatus(document.id, "Đã hoàn thành"))
      : message === "yêu cầu xác nhận hoàn thành"
      ? dispatch(changeStatus(document.id, "Xác nhận hoàn thành"))
      : message === "không duyệt yêu cầu của nhân viên"
      ? dispatch(changeStatus(document.id, "Nhân viên thực hiện"))
      : message === "duyệt yêu cầu của nhân viên"
      ? dispatch(changeStatus(document.id, "Trưởng phòng thực hiện"))
      : dispatch(changeStatus(document.id, "Chờ trưởng phòng duyệt"));
    message === "duyệt văn bản"
      ? setStatus("Tiến hành")
      : message === "phát hành văn bản"
      ? setStatus("Đã hoàn thành")
      : message === "không xác nhận hoàn thành"
      ? setStatus("Trưởng phòng thực hiện")
      : message === "kết thúc văn bản"
      ? setStatus("Đã hoàn thành")
      : message === "yêu cầu xác nhận hoàn thành"
      ? setStatus("Xác nhận hoàn thành")
      : message === "không duyệt yêu cầu của nhân viên"
      ? setStatus("Nhân viên thực hiện")
      : message === "duyệt yêu cầu của nhân viên"
      ? setStatus("Trưởng phòng thực hiện")
      : setStatus("Chờ trưởng phòng duyệt");
    setConfirmChangeStatus(false);
    SuccessNoti();
    // window.history.back();
  };

  const SuccessNoti = () => {
    store.addNotification({
      title: "Thành công",
      message: `${message} thành công`,
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
      <Banner2 title={["Quản lý văn bản", document.name || ""]} />

      <section className="details-page padding">
        <h1>Thông tin về văn bản {document.name} :</h1>
        {document && (
          <div className="information">
            <p>
              <span>Tên văn bản :</span> {document.name}
            </p>
            <p>
              <span>Mô tả :</span> {document.description}
            </p>
            <p>
              <span>Trạng thái :</span> {status ? status : document.status}
            </p>
            <p>
              <span>Loại văn bản :</span>{" "}
              {document.docTypeId === "167751611920858000"
                ? "Văn bản thông báo"
                : document.docTypeId === "39504437639007016"
                ? "Văn bản phân công"
                : "Văn bản gửi lên cấp trên"}
            </p>
            <p>
              <span>Bộ phận: </span>
              {(organizational &&
                organizational.length > 0 &&
                document &&
                document.departmentId &&
                organizational.find((dpm) => dpm.id === document.departmentId)
                  .name) ||
                ""}
            </p>
            {document.senderId && (
              <p>
                <span>Nơi đến: </span>
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
              <span>Ngày tạo : </span> {moment(document.createdAt).format("L")}
            </p>
            <p>
              <span>Cập nhật lần cuối: </span>{" "}
              {moment(document.updatedAt).format("L")}
            </p>
            <div className="button-container">
              {/* BAN GIAM HIEU  */}
              {groupID === "461341600943357060" &&
                document.docTypeId === "39504437639007016" &&
                document.status === "Chờ duyệt" &&
                !status && (
                  <button
                    className="agree"
                    onClick={() => {
                      setMessage("duyệt văn bản");
                      setConfirmChangeStatus(true);
                    }}
                  >
                    Duyệt
                  </button>
                )}

              {groupID === "461341600943357060" &&
                document.docTypeId === "167751611920858000" &&
                document.status !== "Đã hoàn thành" &&
                !status && (
                  <button
                    className="agree"
                    onClick={() => {
                      setMessage("phát hành văn bản");
                      setConfirmChangeStatus(true);
                    }}
                  >
                    Phát hành văn bản
                  </button>
                )}

              {groupID === "461341600943357060" &&
                document.docTypeId === "39504437639007016" &&
                document.status === "Xác nhận hoàn thành" &&
                !status && (
                  <>
                    <button
                      className="disagree"
                      onClick={() => {
                        setMessage("không xác nhận hoàn thành");
                        setConfirmChangeStatus(true);
                      }}
                    >
                      Không xác nhận
                    </button>
                    <button
                      className="agree"
                      onClick={() => {
                        setMessage("kết thúc văn bản");
                        setConfirmChangeStatus(true);
                      }}
                    >
                      Kết thúc văn bản
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
                document.status === "Trưởng phòng thực hiện" &&
                !status && (
                  <>
                    <button
                      className="agree"
                      onClick={() => {
                        setMessage("yêu cầu xác nhận hoàn thành");
                        setConfirmChangeStatus(true);
                      }}
                    >
                      Yêu cầu xác nhận hoàn thành
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
                document.status === "Chờ trưởng phòng duyệt" &&
                !status && (
                  <>
                    <button
                      className="disagree"
                      onClick={() => {
                        setMessage("không duyệt yêu cầu của nhân viên");
                        setConfirmChangeStatus(true);
                      }}
                    >
                      Không duyệt
                    </button>
                    <button
                      className="agree"
                      onClick={() => {
                        setMessage("duyệt yêu cầu của nhân viên");
                        setConfirmChangeStatus(true);
                      }}
                    >
                      Duyệt yêu cầu của nhân viên
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
                document.status === "Nhân viên thực hiện" &&
                !status && (
                  <>
                    <button
                      className="agree"
                      onClick={() => {
                        setMessage("báo cáo lên trưởng phòng");
                        setConfirmChangeStatus(true);
                      }}
                    >
                      Báo cáo lên trưởng phòng
                    </button>
                  </>
                )}
            </div>
          </div>
        )}
        <p onClick={() => window.history.back()}>Quay lại trang trước</p>
        {confirmChangeStatus && <span className="bg"></span>}
        {confirmChangeStatus && (
          <div className="delete-employee">
            <p>Bạn có muốn {message} không?</p>
            <div className="confirm">
              <button onClick={() => changeStatusDocument()}>Xác nhân</button>
              <button onClick={() => setConfirmChangeStatus(false)}>Hủy</button>
            </div>
          </div>
        )}
      </section>

      <Footer2 />
    </>
  );
};

export default DocumentDetails;
