// src/components/RegisterForm.jsx
import { useState } from 'react'

const RegisterForm = ({ onRegister }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    onRegister({ email, password })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto">
      <h2 className="text-xl font-bold">ユーザー登録</h2>
      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="border px-3 py-2 w-full rounded"
      />
      <input
        type="password"
        placeholder="パスワード（8文字以上）"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        minLength={8}
        className="border px-3 py-2 w-full rounded"
      />
      <button
        type="submit"
        className="bg-green-500 text-white px-4 py-2 rounded w-full"
      >
        登録
      </button>
    </form>
  )
}

export default RegisterForm
