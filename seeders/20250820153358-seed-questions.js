'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    const now = new Date()
    await queryInterface.bulkInsert('Questions', [
      { text: "Management is capable and competent", order: 1, createdAt: now, updatedAt: now },
      { text: "Management clearly explains strategies and goals", order: 2, createdAt: now, updatedAt: now },
      { text: "Management positively motivates employees to achieve goals", order: 3, createdAt: now, updatedAt: now },
      { text: "Management has realistic performance expectations", order: 4, createdAt: now, updatedAt: now },
      { text: "Management takes responsibility for their actions", order: 5, createdAt: now, updatedAt: now },
      { text: "Management treats employees with respect", order: 6, createdAt: now, updatedAt: now },
      { text: "Management is accessible for questions and advice", order: 7, createdAt: now, updatedAt: now },
      { text: "Management follows company rules and policies", order: 8, createdAt: now, updatedAt: now },
      { text: "Management takes a personal interest in my success", order: 9, createdAt: now, updatedAt: now },
      { text: "I feel comfortable speaking with management", order: 10, createdAt: now, updatedAt: now }
    ])
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Questions', null, {})
  }
}
