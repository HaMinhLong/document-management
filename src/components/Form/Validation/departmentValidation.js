import * as yup from "yup";

export const departmentValidation = yup.object().shape({
  name: yup
    .string()
    .max(30, "Tên bộ phận không được vượt quá 30 ký tự")
    .required("Không được để trống tên"),
  description: yup
    .string()
    .max(500, "Mô tả bộ phận không đượt vượt quá 500 ký tự")
    .required("Không được để trống mô tả"),
  email: yup
    .string()
    .email("Email có dạng email@gmail.com hoặc email@thanglong.edu.vn")
    .max(30, "Email không được vượt quá 30 ký tự")
    .required("Không được để trống email"),
  phoneNumber: yup
    .number("Số điện thoại không hợp lệ")
    .required("Không được để trống số điện thoại"),
});
