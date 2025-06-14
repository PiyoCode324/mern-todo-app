const Todo = require('../models/todoModel');

// 一覧取得
exports.getTodos = async (req, res) => {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: 'サーバーエラー' });
  }
};

// 追加
exports.createTodo = async (req, res) => {
  try {
    const { text, category, deadline } = req.body;
    const newTodo = new Todo({ 
      text, 
      category: category || '未分類',
      deadline: deadline || null  // nullでもOK。空欄対応。
    });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ message: 'タスクの追加に失敗しました' });
  }
};

// 削除
exports.deleteTodo = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: '削除に失敗しました' });
  }
};

// 完了状態更新＋カテゴリ更新にも対応
exports.updateTodo = async (req, res) => {
  try {
    const { completed, category } = req.body;
    const updateData = {};
    if (completed !== undefined) updateData.completed = completed;
    if (category !== undefined) updateData.category = category;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );
    res.json(updatedTodo);
  } catch (err) {
    res.status(500).json({ message: '更新に失敗しました' });
  }
};
