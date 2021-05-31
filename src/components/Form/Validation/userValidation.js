import * as yup from "yup";

export const userValidation = yup.object({
  username: yup
    .string()
    .max(20, "Tài khoản không được dài hơn 20 ký tự")
    .required("Tài khoản không được để trống"),
  password: yup
    .string()
    .min(6, "Mật khẩu không được ít hơn 6 ký tự")
    .required("Mât khẩu không được để trống"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Mật khẩu không trùng nhau")
    .required("Xác nhận mật khẩu không được để trống"),
});
