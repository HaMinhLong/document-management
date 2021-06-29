import * as yup from "yup";

export const proccessValidation = yup.object().shape({
  name: yup
    .string()
    .max(50, "Tên không được vượt quá 50 ký tự")
    .required("Không được để trống tên"),
  description: yup
    .string()
    .max(256, "Mô tả bộ phận không đượt vượt quá 256 ký tự")
    .required("Không được để trống mô tả"),
  status: yup.string().required("Không được để trống trạng thái"),
});
