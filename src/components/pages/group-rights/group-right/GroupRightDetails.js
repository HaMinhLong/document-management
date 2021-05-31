import React, { useState, useEffect } from "react";

import Banner2 from "../../../layout/Banner2";
import Footer2 from "../../../layout/Footer2";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";

import { fetchGroup } from "../../../../redux/groups/groupsActions";
import { fetchRight } from "../../../../redux/rights/rightsActions";
import { fetchGroupRight } from "../../../../redux/group-rights/groupRightsActions";

const GroupRightDetails = (props) => {
  const dispatch = useDispatch();
  const groupRightId = props.match.params.id;
  useEffect(() => {
    dispatch(fetchGroupRight(groupRightId));
  }, []);

  const groupRight = useSelector((state) => state.groupRights);
  useEffect(() => {
    dispatch(fetchGroup(groupRight.groupId));
    dispatch(fetchRight(groupRight.rightId));
  }, [groupRight]);

  const group = useSelector((state) => state.groups);
  const right = useSelector((state) => state.rights);

  return (
    <>
      <Banner2 title={["Quản lý nhsom quyền"]} />
      <section className="details-page padding">
        <h1>Thông tin về nhóm quyền :</h1>

        {groupRight && group && right && (
          <div className="information">
            <p>
              <span>Tên chức vụ :</span> {group.name}
            </p>
            <p>
              <span>Quyền được cấp: </span> {right.name}
            </p>
            <p>
              <span>Ngày lập : </span>{" "}
              {moment(groupRight.createdAt).format("L")}
            </p>
            <p>
              <span>Cập nhật lần cuối: </span>{" "}
              {moment(groupRight.updatedAt).format("L")}
            </p>
          </div>
        )}

        <p onClick={() => window.history.back()}>Quay lại trang trước</p>
      </section>
      <Footer2 />
    </>
  );
};

export default GroupRightDetails;
