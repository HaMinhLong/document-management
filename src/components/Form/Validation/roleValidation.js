import * as yup from "yup";

export const roleValidation = yup.object({
  name: yup.string().required("Tên chức vụ không được để trống"),
});
