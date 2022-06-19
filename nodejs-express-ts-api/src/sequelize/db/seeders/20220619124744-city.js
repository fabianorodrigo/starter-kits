"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "ta_municipio",
      [
        {
          cd_municipio: 3550308,
          cd_dv_municipio: 1,
          nm_municipio: "Governador Valadares",
          cd_uf: "MG",
          createdAt: new Date(),
        },
        {
          cd_municipio: 2050308,
          cd_dv_municipio: 2,
          nm_municipio: "Rio de Janeiro",
          cd_uf: "RJ",
          createdAt: new Date(),
        },

        {
          cd_municipio: 8050308,
          cd_dv_municipio: 4,
          nm_municipio: "Sobral",
          cd_uf: "CE",
          createdAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("ta_municipio", null, {});
  },
};
