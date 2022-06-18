"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ta_unidade_federacao",
      [
        {
          cd_uf: "MG",
          nm_uf: "Minas Gerais",
          createdAt: new Date(),
        },
        {
          cd_uf: "CE",
          nm_uf: "Ceará",
          createdAt: new Date(),
        },
        {
          cd_uf: "RJ",
          nm_uf: "Rio de Janeiro",
          createdAt: new Date(),
        },
        {
          cd_uf: "SP",
          nm_uf: "São Paulo",
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("uf", null, {});
  },
};
