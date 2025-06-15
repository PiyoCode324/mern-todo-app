// server/routes/todoRoutes.js

import express from 'express'; // require を import に変更
const router = express.Router();
import todoController from '../controllers/todoController.js'; // require を import に変更し、相対パスに .js 拡張子を追加
import authMiddleware from '../middleware/authMiddleware.js'; // require を import に変更し、相対パスに .js 拡張子を追加

// 認証済みユーザーのみアクセス可能
router.get('/', authMiddleware, todoController.getTodos);
router.post('/', authMiddleware, todoController.createTodo);
router.delete('/:id', authMiddleware, todoController.deleteTodo);
router.put('/:id', authMiddleware, todoController.updateTodo);

export default router; // module.exports を export default に変更