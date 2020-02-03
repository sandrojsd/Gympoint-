module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('registrations', 'price', {
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.removeColumn('registrations', 'price');
  },
};
