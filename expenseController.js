 const Expense = require('../models/Expense');

// ✅ Add a new expense with validation
exports.addExpense = async (req, res) => {
  try {
    const { amount, category, description } = req.body;

    // Input validation
    if (amount == null || isNaN(amount)) {
      return res.status(400).json({ error: 'Amount is required and must be a number.' });
    }

    if (!category || typeof category !== 'string') {
      return res.status(400).json({ error: 'Category is required and must be a string.' });
    }

    const expense = new Expense({ amount, category, description });
    await expense.save();

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong while saving the expense.' });
  }
};

// ✅ Get all expenses
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching expenses.' });
  }
};

// ✅ Get total amount spent
exports.getTotal = async (req, res) => {
  try {
    const expenses = await Expense.find();
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    res.json({ total });
  } catch (error) {
    res.status(500).json({ error: 'Error calculating total.' });
  }
};

// ✅ Update an expense with validation
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.body.amount && isNaN(req.body.amount)) {
      return res.status(400).json({ error: 'Amount must be a number.' });
    }

    const updated = await Expense.findByIdAndUpdate(id, req.body, { new: true });

    if (!updated) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Error updating expense.' });
  }
};

// ✅ Delete an expense with error handling
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Expense.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Expense not found.' });
    }

    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting expense.' });
  }
};
