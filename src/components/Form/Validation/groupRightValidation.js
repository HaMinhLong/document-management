import * as yup from "yup";

export const groupRightValidation = yup.object({
  groupId: yup.string().required("Chức vụ không được để trống"),
  // rightId: yup.string().required("Quyền không được để trống"),
});
