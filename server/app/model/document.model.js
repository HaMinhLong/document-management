module.exports = (sequelize, Sequelize) => {
  const Document = sequelize.define("document", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    code: {
      type: Sequelize.STRING,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
    signature: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.ENUM,
      values: [
        "Chờ duyệt",
        "Từ chối",
        "Tiến hành",
        "Trưởng phòng thực hiện",
        "Nhân viên thực hiện",
        "Chờ trưởng phòng duyệt",
        "Xác nhận hoàn thành",
        "Quá thời hạn xử lý",
        "Đã hoàn thành",
      ],
    },
  });
  return Document;
};
