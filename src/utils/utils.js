export const nextPagination = (number, index, setData, data) => {
  setData(data.slice(number * (index - 1), number * index));
};

export const deleteFunctionUtils = (
  id,
  deleteFunc,
  setConfirmDelete,
  dispatch
) => {
  dispatch(deleteFunc(id));
  setConfirmDelete(false);
};

export const searchData = (value, data, setData) => {
  const dataSearch = data.filter(
    (dt) => dt.name.toLowerCase().indexOf(value) !== -1
  );
  setData(dataSearch.slice(0, 10));
};

export const checkAdmin = (groupId) =>
  groupId === "644317359247429400" || groupId === "461341600943357060"
    ? true
    : false;

export const checkDocManagement = (groupId) =>
  checkAdmin(groupId) || groupId === "222908158858354780" ? true : false;
