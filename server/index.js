// server/index.js

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath } from 'url';
import todoRoutes from './routes/todoRoutes.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// __dirnameを使うための設定（ESM環境）
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// MongoDBに接続
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// APIルーティング
app.use('/api/todos', todoRoutes);
app.use('/api', authRoutes);

// Viteのビルド成果物を静的ファイルとして配信
app.use(express.static(path.join(__dirname, '../client/dist')));

// すべてのGETリクエストに対してindex.htmlを返す（SPA対応）
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
