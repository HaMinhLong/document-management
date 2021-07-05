import React, { useEffect } from "react";

import Banner2 from "../../../layouts/Banner2";
import Footer2 from "../../../layouts/Footer2";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { fetchRight } from "../../../redux/rights/rightsActions";

const RightDetails = (props) => {
  const dispatch = useDispatch();
  const id = props.match.params.id;

  useEffect(() => {
    dispatch(fetchRight(id));
  }, []);
  const right = useSelector((state) => state.rights);

  return (
    <>
      {right && (
        <>
          <Banner2 title={["Quản lý quyền", right.name]} />
          <section className="details-page padding">
            <h1>Thông tin về quyền {right.name} :</h1>
            <div className="information">
              <p>
                <span>Tên quyền :</span> {right.name}
              </p>
              <p>
                <span>Ngày lập : </span> {moment(right.createdAt).format("L")}
              </p>
              <p>
                <span>Cập nhật lần cuối: </span>{" "}
                {moment(right.updatedAt).format("L")}
              </p>
            </div>
            <p onClick={() => window.history.back()}>Quay lại trang trước</p>
          </section>
          <Footer2 />
        </>
      )}
    </>
  );
};

export default RightDetails;
