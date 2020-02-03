module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameTable('registrations', 'enrollments', {
      type: Sequelize.INTEGER,
    });
  },

  down: queryInterface => {
    return queryInterface.renameTable('registrations', 'enrollments');
  },
};
