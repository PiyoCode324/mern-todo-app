// server/models/User.js

import mongoose from 'mongoose'; // require を import に変更

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // 同じメールアドレスで登録できないようにする
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  }
});

export default mongoose.model('User', UserSchema); // module.exports を export default に変更