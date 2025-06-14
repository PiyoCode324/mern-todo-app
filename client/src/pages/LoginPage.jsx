// src/pages/LoginPage.jsx
import axios from "axios"
import LoginForm from "../components/LoginForm"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  // 環境変数からAPIのベースURLを取得（デフォルトはローカル）
  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api"

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post(`${baseURL}/login`, formData)
      const { token } = response.data

      login(token) // ← ここがポイント！
      console.log("ログイン成功:", token)

      navigate("/todos") // ← 適切にcontextが反映されてから遷移する
    } catch (error) {
      console.error("ログイン失敗:", error.response?.data?.message || error.message)
      alert("ログインに失敗しました")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <LoginForm onLogin={handleLogin} />
    </div>
  )
}

export default LoginPage
