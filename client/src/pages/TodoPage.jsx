import { useState, useEffect } from 'react'
import TodoInput from '../components/TodoInput'
import TodoList from '../components/TodoList'
import Modal from '../components/Modal'

function TodoPage() {
  const [todos, setTodos] = useState([])
  const [isDark, setIsDark] = useState(false)
  const [filterCategory, setFilterCategory] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortOrder, setSortOrder] = useState('desc')
  const [sortBy, setSortBy] = useState('createdAt')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const token = localStorage.getItem('token')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch('http://localhost:4000/api/todos', {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('サーバーエラー')
        return res.json()
      })
      .then(data => {
        setTodos(data)
        setLoading(false)
      })
      .catch(err => {
        setError(err)
        setLoading(false)
      })
  }, [token])

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsModalOpen(false)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  const addTodo = (text, category, deadline) => {
    fetch('http://localhost:4000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ text, category, deadline }),
    })
      .then(res => {
        if (!res.ok) throw new Error('追加に失敗しました')
        return res.json()
      })
      .then(newTodo => {
        setTodos(prev => [newTodo, ...prev])
        setIsModalOpen(false)
      })
      .catch(err => console.error('追加失敗:', err))
  }

  const deleteTodo = (id) => {
    fetch(`http://localhost:4000/api/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => {
        if (!res.ok) throw new Error('削除に失敗しました')
        setTodos(prev => prev.filter(todo => todo._id !== id))
      })
      .catch(err => console.error('削除失敗:', err))
  }

  const toggleTodo = (id) => {
    const target = todos.find(todo => todo._id === id)
    if (!target) return

    fetch(`http://localhost:4000/api/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ completed: !target.completed }),
    })
      .then(res => {
        if (!res.ok) throw new Error('更新に失敗しました')
        return res.json()
      })
      .then(updated => {
        setTodos(prev => prev.map(todo => (todo._id === id ? updated : todo)))
      })
      .catch(err => console.error('更新失敗:', err))
  }

  const filteredTodos = todos
    .filter(todo => (filterCategory ? todo.category === filterCategory : true))
    .filter(todo => {
      if (filterStatus === 'completed') return todo.completed
      if (filterStatus === 'incomplete') return !todo.completed
      return true
    })

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    const aVal = a[sortBy] ? new Date(a[sortBy]) : null
    const bVal = b[sortBy] ? new Date(b[sortBy]) : null

    if (!aVal && !bVal) return 0
    if (!aVal) return 1
    if (!bVal) return -1

    return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
  })

  const categories = [...new Set(todos.map(todo => todo.category).filter(Boolean))]

  return (
    <div className="px-4 sm:px-8 py-8 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-300">📝 ToDo アプリ</h1>
        <button
          onClick={() => setIsDark(prev => !prev)}
          className="bg-gray-300 dark:bg-gray-700 text-sm px-3 py-1 rounded"
        >
          {isDark ? '☀️ ライト' : '🌙 ダーク'}
        </button>
      </div>

      <div className="max-w-2xl mx-auto mb-4 flex items-center gap-4 flex-wrap">
        <label>カテゴリで絞り込み:</label>
        <select
          value={filterCategory}
          onChange={e => setFilterCategory(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="">すべて</option>
          {categories.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>

        <label>状態で絞り込み:</label>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="all">すべて</option>
          <option value="incomplete">未完了</option>
          <option value="completed">完了済み</option>
        </select>

        <label>並び順:</label>
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="asc">昇順</option>
          <option value="desc">降順</option>
        </select>

        <label>基準:</label>
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="createdAt">作成日</option>
          <option value="deadline">期限</option>
        </select>
      </div>

      <div className="max-w-2xl mx-auto mb-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          ➕ 新しいToDoを追加
        </button>
      </div>

      <div className="max-w-2xl mx-auto">
        <TodoList
          todos={sortedTodos}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          loading={loading}
          error={error}
        />
      </div>

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <TodoInput addTodo={addTodo} />
        </Modal>
      )}
    </div>
  )
}

export default TodoPage
