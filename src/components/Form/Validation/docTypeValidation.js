import * as yup from "yup";

export const docTypeValidation = yup.object({
  name: yup.string().required("Tên loại văn bản không được để trống"),
});
