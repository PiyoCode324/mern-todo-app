// server/routes/todoRoutes.js (修正後)

import express from 'express';
const router = express.Router();
// ここを修正：デフォルトインポートではなく、アスタリスクを使った名前付きインポートに変更
import * as todoController from '../controllers/todoController.js'; 
import authMiddleware from '../middleware/authMiddleware.js';

// 認証済みユーザーのみアクセス可能
router.get('/', authMiddleware, todoController.getTodos);
router.post('/', authMiddleware, todoController.createTodo);
router.delete('/:id', authMiddleware, todoController.deleteTodo);
router.put('/:id', authMiddleware, todoController.updateTodo);

export default router;