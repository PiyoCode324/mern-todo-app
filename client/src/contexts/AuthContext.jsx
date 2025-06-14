import React, { createContext, useState, useEffect } from "react"

// Contextの作成
export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  // 認証状態の管理：tokenとユーザ情報（ここでは単純にtokenだけ管理）
  const [token, setToken] = useState(null)

  // ローカルストレージからtokenを読み込む処理（ページリロード時にも状態維持）
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    console.log("Stored token on init:", storedToken);
    if (storedToken) {
      setToken(storedToken);
    }
  }, [])

  // ログイン処理：tokenを保存しstateとlocalStorageにセット
  const login = (jwtToken) => {
    setToken(jwtToken)
    localStorage.setItem("token", jwtToken)
  }

  // ログアウト処理：stateとlocalStorageからtokenを削除
  const logout = () => {
    setToken(null)
    localStorage.removeItem("token")
  }

  // 認証済みかどうかの判定
  const isAuthenticated = !!token

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

