  const express = require('express');
const router = express.Router();
const {
  addExpense,
  getExpenses,
  getTotal,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');

// Routes
router.post('/', addExpense);
router.get('/', getExpenses);
router.get('/total', getTotal);
router.put('/:id', updateExpense);
router.delete('/:id', deleteExpense);

module.exports = router;
