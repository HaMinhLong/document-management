import * as yup from "yup";

export const assignedValidation = yup.object().shape({
  documentId: yup.string().required("Không được để trống văn bản"),
  employeeId: yup.string().required("Không được để trống nhân viên"),
  roleId: yup.string().required("Không được để trống chức vụ"),
});
