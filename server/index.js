// server/index.js

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url'; // これで正しい形です
import todoRoutes from './routes/todoRoutes.js'; // ★ここをコメント解除
import authRoutes from './routes/auth.js';       // 有効のまま
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// __dirnameを使うための設定（ESM環境）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ミドルウェアの設定
app.use(cors());
app.use(express.json());

// MongoDBに接続
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// APIルーティング
app.use('/api/todos', todoRoutes); // ★ここをコメント解除
app.use('/api', authRoutes);       // 有効のまま

// Viteのビルド成果物を静的ファイルとして配信
app.use(express.static(path.join(__dirname, '../client/dist')));

// SPA (シングルページアプリケーション) のフォールバックルーティング
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// サーバーを起動
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});