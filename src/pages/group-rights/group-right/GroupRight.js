import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";
import moment from "moment";
import TableHead from "../../../components/componentDashs/TableHead";

import { useSelector, useDispatch } from "react-redux";
import { fetchGroups } from "../../../redux/groups/groupsActions";
import { fetchRights } from "../../../redux/rights/rightsActions";

const GroupRight = ({ groupRights, setConfirmDelete, setGroupRightId }) => {
  const dispatch = useDispatch();

  const deleteGroupRight = (id) => {
    setConfirmDelete(true);
    setGroupRightId(id);
  };

  useEffect(() => {
    dispatch(fetchGroups());
    dispatch(fetchRights());
  }, []);

  const groups = useSelector((state) => state.groups);
  const rights = useSelector((state) => state.rights);

  return (
    <>
      <div className="table-container">
        <table>
          <TableHead
            fields={[
              "Tên chức vụ",
              "Quyền",
              "Ngày cấp quyền",
              "Cập nhật lần cuối",
              "Hành động",
            ]}
            checkRight={false}
          />
          <tbody>
            {groupRights &&
              groupRights.length > 0 &&
              groupRights.map((data) => (
                <tr key={data.id}>
                  <td className="name">
                    <Link to={`/group-right/${data.id}`}>
                      {groups &&
                        groups.length > 0 &&
                        groups.find((group) => group.id === data.groupId).name}
                    </Link>
                  </td>
                  <td>
                    {rights.find((right) => right.id === data.rightId).name}
                  </td>
                  <td>{moment(data.createdAt).format("L")}</td>
                  <td>{moment(data.updatedAt).format("L")}</td>
                  <td>
                    <Link to={`/add-groupright-${data.id}`}>
                      <i className="fas fa-edit"></i>
                    </Link>
                    <i
                      className="fas fa-trash"
                      onClick={() => deleteGroupRight(data.id)}
                    ></i>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default GroupRight;
