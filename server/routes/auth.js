// server/routes/auth.js

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

/**
 * ユーザー登録 API
 * POST /api/register
 */
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // 登録済みユーザーのチェック
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'すでに登録されているメールアドレスです' });
    }

    // パスワードをハッシュ化
    const hashedPassword = await bcrypt.hash(password, 10);

    // ユーザー保存
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'ユーザー登録に成功しました' });
  } catch (error) {
    console.error('登録エラー:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

/**
 * ログイン API
 * POST /api/login
 */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // ユーザー存在チェック
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'メールまたはパスワードが違います' });
    }

    // パスワード照合
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'メールまたはパスワードが違います' });
    }

    // JWT 作成
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // トークン返却
    res.json({ token });
  } catch (error) {
    console.error('ログインエラー:', error);
    res.status(500).json({ message: 'サーバーエラーが発生しました' });
  }
});

module.exports = router;
