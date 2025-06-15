// server/models/todoModel.js

import mongoose from 'mongoose'; // require を import に変更

const todoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false },
  category: { type: String, default: '未分類' },
  deadline: { type: Date, default: null } // ✅ ここを追加！
}, { timestamps: true });

export default mongoose.model('Todo', todoSchema); // module.exports を export default に変更