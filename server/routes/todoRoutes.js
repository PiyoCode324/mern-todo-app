const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');
const authMiddleware = require('../middleware/authMiddleware'); // 👈 追加

// 認証済みユーザーのみアクセス可能
router.get('/', authMiddleware, todoController.getTodos);
router.post('/', authMiddleware, todoController.createTodo);
router.delete('/:id', authMiddleware, todoController.deleteTodo);
router.put('/:id', authMiddleware, todoController.updateTodo);

module.exports = router;
