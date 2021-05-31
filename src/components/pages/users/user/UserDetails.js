import React, { useEffect } from "react";

import Banner2 from "../../../layout/Banner2";
import Footer2 from "../../../layout/Footer2";
import moment from "moment";

import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../../../../redux/users/usersActions";
import { fetchGroup } from "../../../../redux/groups/groupsActions";

const UserDetails = (props) => {
  const dispatch = useDispatch();
  const username = props.match.params.id;

  useEffect(() => {
    dispatch(fetchUser(username));
  }, []);
  const user = useSelector((state) => state.users);

  useEffect(() => {
    user && dispatch(fetchGroup(user.groupId));
  }, [user]);

  const group = useSelector((state) => state.groups);

  return (
    <>
      {user && (
        <>
          <Banner2 title={["Quản lý tài khoản", user.username]} />
          <section className="details-page padding">
            <h1>Thông tin về tài khoản {user.username} :</h1>
            <div className="information">
              <p>
                <span>Tên tài khoản :</span> {user.username}
              </p>
              <p>
                <span>Chức vụ : </span>
                {group.name}
              </p>
              <p>
                <span>Ngày lập : </span> {moment(user.createdAt).format("L")}
              </p>
              <p>
                <span>Cập nhật lần cuối: </span>{" "}
                {moment(user.updatedAt).format("L")}
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

export default UserDetails;
