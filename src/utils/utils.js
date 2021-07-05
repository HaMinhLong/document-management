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
