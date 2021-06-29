import * as yup from "yup";

export const documentValidation = yup.object().shape({
  code: yup
    .string()
    .max(10, "Mã văn bản không được vượt quá 10 ký tự")
    .required("Không được để trống mã văn bản"),
  name: yup
    .string()
    .max(50, "Tên văn bản không được vượt quá 50 ký tự")
    .required("Không được để trống tên văn bản"),
  description: yup
    .string()
    .max(256, "Mô tả vản bản không đượt vượt quá 256 ký tự")
    .required("Không được để trống mô tả vản bản"),
  status: yup.string().required("Không được để trống trạng thái"),
  docTypeId: yup.string().required("Không được để trống loại văn bản"),
});
