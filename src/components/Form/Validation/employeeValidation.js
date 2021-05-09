import * as yup from "yup";

export const employeeValidation = yup.object().shape({
  name: yup
    .string()
    .max(20, "Tên không được vượt quá 20 ký tự")
    .required("Không được để trống tên"),
  code: yup
    .string()
    .max(5, "Mã nhân viên không đượt vượt quá 5 ký tự")
    .required("Không được để trống mã nhân viên"),
  email: yup
    .string()
    .email("Email có dạng email@gmail.com hoặc email@thanglong.edu.vn")
    .max(30, "Email không được vượt quá 30 ký tự")
    .required("Không được để trống email"),
  phoneNumber: yup
    .number("Số điện thoại không hợp lệ")
    .required("Không được để trống số điện thoại"),
  organizational: yup.string().required("Không được để trống cơ cấu tổ chức"),
  position: yup.string().required("Không được để trống chức vụ"),
});
