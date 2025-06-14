// src/pages/RegisterPage.jsx
import axios from "axios"
import RegisterForm from "../components/RegisterForm"
import { useNavigate } from "react-router-dom"

const RegisterPage = () => {
  const navigate = useNavigate()

  // 環境変数からAPIのベースURLを取得（無ければローカルにフォールバック）
  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4000/api"

  const handleRegister = async (formData) => {
    try {
      const response = await axios.post(`${baseURL}/register`, formData)
      console.log("登録成功:", response.data)
      navigate("/login") // 登録成功後にログインページへ移動
    } catch (error) {
      console.error("登録失敗:", error.response?.data?.message || error.message)
      alert("登録に失敗しました")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <RegisterForm onRegister={handleRegister} />
    </div>
  )
}

export default RegisterPage
