import axios from "axios";

const url = "http://127.0.0.1:8081/api";

// ORGANIZATIONAL MANAGEMENT
export const fetchOrganizational = () => axios.get(`${url}/departments`);
export const fetchDepartments = (id) => axios.get(`${url}/departments/${id}`);
export const createDepartment = (department) =>
  axios.post(`${url}/departments`, department);
export const updateDepartment = (id, department) =>
  axios.put(`${url}/departments/${id}`, department);
export const deleteDepartment = (id) =>
  axios.delete(`${url}/departments/${id}`);

// EMPLOYEE MANAGEMENT
export const fetchEmployees = () => axios.get(`${url}/employees`);
export const fetchEmployee = (id) => axios.get(`${url}/employees/${id}`);

export const createEmployee = (id, employee) =>
  axios.post(`${url}/employees/${id}`, employee);

export const updateEmployee = (id, employee) =>
  axios.put(`${url}/employees/${id}`, employee);
export const deleteEmployee = (id) => axios.delete(`${url}/employees/${id}`);

// USER MANAGEMENT
export const fetchUsers = () => axios.get(`${url}/users`);
export const fetchUser = (id) => axios.get(`${url}/users/${id}`);
export const createUser = (user) => axios.post(`${url}/users`, user);
export const updateUser = (id, user) => axios.put(`${url}/users/${id}`, user);
export const deleteUser = (id) => axios.delete(`${url}/users/${id}`);
export const SignIn = (user) => axios.post(`${url}/users/signin`, user);
export const fetchAvailableUsers = (id) =>
  axios.get(`${url}/listAvailable/${id}`);
