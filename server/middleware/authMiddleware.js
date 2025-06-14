// server/middleware/authMiddleware.js

const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // トークンがない場合
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: '認証トークンが必要です' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // トークンを検証
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // ユーザー情報をリクエストに添付
    req.user = decoded;
    next(); // 次の処理へ
  } catch (err) {
    return res.status(401).json({ message: '無効なトークンです' });
  }
};

module.exports = authMiddleware;
