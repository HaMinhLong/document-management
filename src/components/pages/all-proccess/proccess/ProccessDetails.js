import React, { useEffect } from "react";

import Banner2 from "../../../layout/Banner2";
import Footer2 from "../../../layout/Footer2";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { fetchProccess } from "../../../../redux/proccess/proccessActions";

const ProccessDetails = (props) => {
  const dispatch = useDispatch();
  const proccessID = props.match.params.id;

  useEffect(() => {
    dispatch(fetchProccess(proccessID));
  }, []);
  const proccess = useSelector((state) => state.proccess);

  return (
    <>
      <Banner2 title={["Quản lý tiến trình", proccess.name]} />
      <section className="details-page padding">
        <h1>Thông tin về {proccess.name} :</h1>
        {proccess && (
          <div className="information">
            <p>
              <span>Tên tiến trình :</span> {proccess.name}
            </p>
            <p>
              <span>Mô tả :</span> {proccess.description}
            </p>
            <p>
              <span>Trạng thái :</span> {proccess.status}
            </p>
            <p>
              <span>Ngày tạo : </span> {moment(proccess.createdAt).format("L")}
            </p>
            <p>
              <span>Cập nhật lần cuối: </span>{" "}
              {moment(proccess.updatedAt).format("L")}
            </p>
          </div>
        )}
        <p onClick={() => window.history.back()}>Quay lại trang trước</p>
      </section>
      <Footer2 />
    </>
  );
};

export default ProccessDetails;
