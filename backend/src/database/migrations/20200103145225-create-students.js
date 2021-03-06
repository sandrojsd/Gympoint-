module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('students', {
      id: {
        type: Sequelize.INTEGER,
        allNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allNull: false,
        unique: true,
      },
      age: {
        type: Sequelize.INTEGER,
        allNull: false,
      },
      weight: {
        type: Sequelize.INTEGER,
        allNull: false,
      },
      height: {
        type: Sequelize.INTEGER,
        allNull: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('students');
  },
};
