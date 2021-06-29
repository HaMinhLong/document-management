module.exports = (sequelize, Sequelize) => {
  const Right = sequelize.define("right", {
    id: {
      type: Sequelize.STRING,
      primaryKey: true,
      unique: true,
    },
    name: {
      type: Sequelize.ENUM,
      values: [
        "Quản lý tài khoản",
        "Quản lý phòng ban",
        "Quản lý nhân viên",
        "Quản lý văn bản đến",
        "Quản lý văn bản nội bộ",
        "Quản lý phân công công việc",
        "Xem danh sách người dùng",
        "Xem danh sách phòng ban",
        "Xem danh sách nhân viên",
        "Xem phân công công việc",
        "Xem văn bản đến",
        "Xem văn bản nội bộ",
        "Quản lý văn bản gửi lên cấp trên",
        "Xem văn bản gửi lên cấp trên",
        "Quản lý loại văn bản",
        "Quản lý nơi đến",
        "Thống kê văn bản",
      ],
    },
    url: {
      type: Sequelize.ENUM,
      values: [
        "user",
        "organizational",
        "employees",
        "incoming-document",
        "internal-document",
        "assigned",
        "user-w",
        "organizational-w",
        "employees-w",
        "assigned-w",
        "incoming-document-w",
        "internal-document-w",
        "document-superior",
        "document-superior-w",
        "doc-type",
        "sender",
        "statistical",
      ],
    },
  });
  return Right;
};
