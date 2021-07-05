import React, { useEffect } from "react";

import Banner2 from "../../../layouts/Banner2";
import Footer2 from "../../../layouts/Footer2";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { fetchGroup } from "../../../redux/groups/groupsActions";

const RoleDetails = (props) => {
  const dispatch = useDispatch();
  const groupID = props.match.params.id;

  useEffect(() => {
    dispatch(fetchGroup(groupID));
  }, []);
  const group = useSelector((state) => state.groups);

  return (
    <>
      <>
        <Banner2 title={["Quản lý chức vụ", group.name]} />
        <section className="details-page padding">
          <h1>Thông tin về chức vụ {group.name} :</h1>
          {group && (
            <div className="information">
              <p>
                <span>Tên chức vụ :</span> {group.name}
              </p>
              <p>
                <span>Ngày lập : </span> {moment(group.createdAt).format("L")}
              </p>
              <p>
                <span>Cập nhật lần cuối: </span>{" "}
                {moment(group.updatedAt).format("L")}
              </p>
            </div>
          )}
          <p onClick={() => window.history.back()}>Quay lại trang trước</p>
        </section>
        <Footer2 />
      </>
    </>
  );
};

export default RoleDetails;
