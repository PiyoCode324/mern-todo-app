// src/pages/LoginPage.jsx
import axios from "axios"
import LoginForm from "../components/LoginForm"
import { useNavigate } from "react-router-dom"
import { useContext } from "react"
import { AuthContext } from "../contexts/AuthContext"

const LoginPage = () => {
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleLogin = async (formData) => {
    try {
      const response = await axios.post("http://localhost:4000/api/login", formData)
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
