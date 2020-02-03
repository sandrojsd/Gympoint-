module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('plans', {
      id: {
        type: Sequelize.INTEGER,
        allNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING,
        allNull: false,
      },
      price: {
        type: Sequelize.DECIMAL,
        allNull: false,
      },
      duration: {
        type: Sequelize.INTEGER,
        allNull: false,
      },
      canceled_at: {
        type: Sequelize.DATE,
        allNull: true,
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
    return queryInterface.dropTable('plans');
  },
};
