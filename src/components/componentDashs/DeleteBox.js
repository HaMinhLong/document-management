import React from "react";
import { useDispatch } from "react-redux";
import { deleteFunctionUtils } from "../../utils/utils";

const DeleteBox = ({ text, setConfirm, confirmDelete, deleteFunction, id }) => {
  const dispatch = useDispatch();
  return (
    <>
      {confirmDelete && <span className="bg"></span>}
      {confirmDelete && (
        <div className="delete-employee">
          <p>Bạn có muốn xóa {text} này không?</p>
          <div className="confirm">
            <button
              onClick={() =>
                deleteFunctionUtils(id, deleteFunction, setConfirm, dispatch)
              }
            >
              Có
            </button>
            <button onClick={() => setConfirm(false)}>Không</button>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteBox;
