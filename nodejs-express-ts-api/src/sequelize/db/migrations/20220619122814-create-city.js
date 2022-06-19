"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ta_municipio", {
      code: {
        type: Sequelize.INTEGER,
        field: "cd_municipio",
        allowNull: false,
        primaryKey: true,
      },
      dv: {
        type: Sequelize.INTEGER,
        field: "cd_dv_municipio",
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING(100),
        field: "nm_municipio",
        allowNull: false,
      },
      codeUF: {
        type: Sequelize.STRING(2),
        field: "cd_uf",
        allowNull: false,
        references: {model: "ta_unidade_federacao", key: "cd_uf"},
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ta_municipio");
  },
};
