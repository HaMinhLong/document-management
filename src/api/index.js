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

// RIGHT MANAGEMENT
export const fetchRights = () => axios.get(`${url}/rights`);
export const fetchRight = (id) => axios.get(`${url}/rights/${id}`);
export const createRight = (right) => axios.post(`${url}/rights`, right);
export const updateRight = (id, right) =>
  axios.put(`${url}/rights/${id}`, right);
export const deleteRight = (id) => axios.delete(`${url}/rights/${id}`);

// GROUP MANAGEMENT
export const fetchGroups = () => axios.get(`${url}/groups`);
export const fetchGroup = (id) => axios.get(`${url}/groups/${id}`);
export const createGroup = (group) => axios.post(`${url}/groups`, group);
export const updateGroup = (id, group) =>
  axios.put(`${url}/groups/${id}`, group);
export const deleteGroup = (id) => axios.delete(`${url}/groups/${id}`);

// GROUP RIGHT MANAGEMENT
export const fetchGroupRights = () => axios.get(`${url}/group-rights`);
export const fetchGroupRight = (id) => axios.get(`${url}/group-rights/${id}`);
export const createGroupRight = (groupRight) =>
  axios.post(`${url}/group-rights`, groupRight);
export const updateGroupRight = (id, groupRight) =>
  axios.put(`${url}/group-rights/${id}`, groupRight);
export const deleteGroupRight = (id) =>
  axios.delete(`${url}/group-rights/${id}`);

// ROLE MANAGEMENT
export const fetchRoles = () => axios.get(`${url}/roles`);
export const fetchRole = (id) => axios.get(`${url}/roles/${id}`);
export const createRole = (role) => axios.post(`${url}/roles`, role);
export const updateRole = (id, role) => axios.put(`${url}/roles/${id}`, role);
export const deleteRole = (id) => axios.delete(`${url}/roles/${id}`);

// TEAM MANAGEMENT
export const fetchTeams = () => axios.get(`${url}/teams`);
export const fetchTeam = (id) => axios.get(`${url}/teams/${id}`);
export const createTeam = (team) => axios.post(`${url}/teams`, team);
export const updateTeam = (id, team) => axios.put(`${url}/teams/${id}`, team);
export const deleteTeam = (id) => axios.delete(`${url}/teams/${id}`);
