module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('plans', 'price', {
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('plans', 'price');
  },
};
