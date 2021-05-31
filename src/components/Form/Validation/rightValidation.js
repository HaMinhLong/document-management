import * as yup from "yup";

export const rightValidation = yup.object({
  name: yup.string().required("Tên quyền không được để trống"),
  url: yup.string().required("URL không được để trống"),
});
