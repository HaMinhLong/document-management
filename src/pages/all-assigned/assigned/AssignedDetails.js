import React, { useEffect } from "react";
import moment from "moment";

import { useDispatch, useSelector } from "react-redux";

import Banner2 from "../../../layouts/Banner2";
import Footer2 from "../../../layouts/Footer2";

import { fetchAssigned } from "../../../redux/assigned/assignedActions";

const AssignedDetails = (props) => {
  const id = props.match.params.id;

  const dispatch = useDispatch();
  useEffect(() => {
    document.title = `TLU | ${assigned.employeeId}`;
    dispatch(fetchAssigned(id));
  }, []);

  const assigned = useSelector((state) => state.assigned);
  return (
    <>
      <Banner2 title={["Quản lý phân công"]} />

      <section className="details-page padding">
        <h1>Thông tin về phân công {assigned.employeeId} :</h1>
        {assigned && (
          <div className="information">
            <p>
              <span>Người thực hiện :</span> {assigned.employeeId}
            </p>
            <p>
              <span>Ngày tạo : </span> {moment(assigned.createdAt).format("L")}
            </p>
            <p>
              <span>Cập nhật lần cuối: </span>{" "}
              {moment(assigned.updatedAt).format("L")}
            </p>
          </div>
        )}
        <p onClick={() => window.history.back()}>Quay lại trang trước</p>
      </section>

      <Footer2 />
    </>
  );
};

export default AssignedDetails;
