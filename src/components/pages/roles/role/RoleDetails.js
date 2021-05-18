import React, { useEffect } from "react";

import Banner2 from "../../../layout/Banner2";
import Footer2 from "../../../layout/Footer2";

import { useSelector, useDispatch } from "react-redux";
import { fetchRole } from "../../../../redux/roles/rolesActions";

const RoleDetails = (props) => {
  const dispatch = useDispatch();
  const roleID = props.match.params.id;

  useEffect(() => {
    dispatch(fetchRole(roleID));
  }, []);
  const role = useSelector((state) => state.roles);

  return (
    <>
      {role && (
        <>
          <Banner2 title={["Quản lý chức vụ", role.name]} />
          <section className="details-page padding">
            <h1>Thông tin về chức vu {role.name} :</h1>
            <div className="information">
              <p>
                <span>Tên chức vụ :</span> {role.name}
              </p>
              {/* <p>
                <span>Ngày lập : </span> {moment(role.createdAt).format("L")}
              </p>
              <p>
                <span>Cập nhật lần cuối: </span>{" "}
                {moment(role.updatedAt).format("L")}
              </p> */}
            </div>
            <p onClick={() => window.history.back()}>Quay lại trang trước</p>
          </section>
          <Footer2 />
        </>
      )}
    </>
  );
};

export default RoleDetails;
