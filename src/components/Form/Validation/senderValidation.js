import * as yup from "yup";

export const senderValidation = yup.object({
  name: yup.string().required("Tên nơi đến không được để trống"),
});
