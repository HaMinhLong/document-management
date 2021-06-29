const fs = require("fs");
const db = require("../config/db.config.js");
const Document = db.document;
const Assigned = db.assigned;
const Employee = db.employees;
const Role = db.role;
const Sender = db.sender;
const DocType = db.docType;
const Sequelize = db.sequelize;
const { QueryTypes } = require("sequelize");

// --------------------------- Xu ly van ban thong bao ------------------------------//

// Tạo mới
exports.create = async (req, res) => {
  await Document.create({
    id: req.body.id,
    code: req.body.code,
    name: req.body.name,
    description: req.body.description,
    status: req.body.status,
    signature: req.body.signature,
    departmentId: req.body.departmentId,
    employeeId: req.body.employeeId,
    docTypeId: req.body.docTypeId,
    senderId: req.body.senderId,
  }).then((document) => {
    // Send created customer to client
    res.send(document);
  });
};

// Hiển thị tất cả
exports.findAll = (req, res) => {
  Document.findAll({}).then((document) => {
    // Send all customers to Client
    res.send(document);
  });
};

// Xoá
exports.delete = (req, res) => {
  const id = req.params.id;
  Document.destroy({
    where: { id: id },
  }).then(() => {
    res.status(200).send("deleted successfully a Document with id = " + id);
  });
};

//  Tìm theo ID
exports.findById = (req, res) => {
  Document.findById(req.params.id).then((document) => {
    res.send(document);
  });
};

// Cập nhật
exports.update = (req, res) => {
  const id = req.params.id;
  Document.update(
    {
      code: req.body.code,
      name: req.body.name,
      description: req.body.description,
      status: req.body.status,
      signature: req.body.signature,
      departmentId: req.body.departmentId,
      employeeId: req.body.employeeId,
      docTypeId: req.body.docTypeId,
      senderId: req.body.senderId,
    },
    { where: { id: req.params.id } }
  ).then(() => {
    res.status(200).send("updated successfully a Document with id = " + id);
  });
};

// Tìm theo bộ phận
// exports.findByDep = (req, res) => {
//   Document.findAll({
//     where: {
//       departmentId: req.params.id,
//     },
//   }).then((document) => {
//     // Send all customers to Client
//     res.send(document);
//   });
// };

exports.findByDep = async (req, res) => {
  const id = req.params.id;

  const query = ` SELECT * FROM documents 
                  WHERE documents.departmentId = '${id}' 
                  OR documents.departmentId = (
                    SELECT id from departments 
                    WHERE departments.belongto = '${id}'
                  )`;
  const document = await Sequelize.query(query, {
    type: QueryTypes.SELECT,
  });

  res.status(200).json(document);
};

// Tìm theo phan cong
exports.findByAssign = async (req, res) => {
  const document = await Sequelize.query(
    "SELECT * FROM `assigneds` INNER JOIN `documents` ON `documents`.`id` = `assigneds`.`documentId` INNER JOIN `roles` ON `roles`.`id` = `assigneds`.`roleId`  WHERE `assigneds`.`employeeId` = ?;",
    {
      replacements: [req.params.id],
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(document);
};

// So luong theo loai van ban
exports.toltalByType = async (req, res) => {
  const { startDate, finishDate } = req.body;

  const document = await Sequelize.query(
    "SELECT COUNT(documents.`id`) AS Number, docTypes.`name` AS Name FROM documents INNER JOIN docTypes ON docTypes.`id` = documents.`docTypeId`  WHERE documents.createdAt > :startDate and documents.createdAt < :finishDate GROUP BY documents.`docTypeId`",
    {
      replacements: {
        startDate: startDate,
        finishDate: finishDate,
      },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(document);
};

// So luong theo nguoi gui
exports.toltalBySender = async (req, res) => {
  const { startDate, finishDate } = req.body;

  const document = await Sequelize.query(
    "SELECT COUNT(documents.`id`) AS Number, senders.`name` AS Name FROM documents INNER JOIN senders ON senders.`id` = documents.`senderId` WHERE documents.createdAt > :startDate and documents.createdAt < :finishDate GROUP BY documents.`senderId`;",
    {
      replacements: {
        startDate: startDate,
        finishDate: finishDate,
      },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(document);
};

// So luong theo phong ban
exports.toltalByDep = async (req, res) => {
  const { startDate, finishDate } = req.body;

  const document = await Sequelize.query(
    "SELECT COUNT(documents.`id`) AS Number, departments.`name` AS Name FROM documents INNER JOIN departments ON departments.`id` = documents.`departmentId` WHERE documents.createdAt > :startDate and documents.createdAt < :finishDate GROUP BY documents.`departmentId`;",
    {
      replacements: {
        startDate: startDate,
        finishDate: finishDate,
      },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(document);
};

// So luong theo tinh trang
exports.toltalByStatus = async (req, res) => {
  const { startDate, finishDate } = req.body;
  const document = await Sequelize.query(
    "SELECT COUNT(documents.`id`) AS Number, documents.`status` AS Name FROM documents WHERE documents.createdAt > :startDate and documents.createdAt < :finishDate GROUP BY documents.`status`;",
    {
      replacements: {
        startDate: startDate,
        finishDate: finishDate,
      },
      type: QueryTypes.SELECT,
    }
  );

  res.status(200).json(document);
};
// Thay doi trang thai theo ID
exports.changeStatus = async (req, res) => {
  const id = req.params.id;
  Document.update(
    {
      status: req.body.status,
    },
    { where: { id: id } }
  ).then(() => {
    res.status(200).send("updated successfully a Document with id = " + id);
  });
};
