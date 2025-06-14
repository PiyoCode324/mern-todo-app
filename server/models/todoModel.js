const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  category: { type: String, default: '未分類' },
  deadline: { type: Date, default: null } // ✅ ここを追加！
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);
