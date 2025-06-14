// TodoInput.jsx
import { useState } from 'react'

function TodoInput({ addTodo }) {
  const [text, setText] = useState('')
  const [category, setCategory] = useState('')
  const [deadline, setDeadline] = useState('')

  const categories = [
    { value: '', label: 'カテゴリを選択（任意）' },
    { value: '仕事', label: '仕事' },
    { value: '勉強', label: '勉強' },
    { value: '家事', label: '家事' },
    { value: '趣味', label: '趣味' },
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!text.trim()) return
    addTodo(text, category, deadline)
    setText('')
    setCategory('')
    setDeadline('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4"
    >
      <input
        type="text"
        value={text}
        placeholder="タスクを入力"
        onChange={(e) => setText(e.target.value)}
        className="w-full px-4 py-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full px-4 py-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
      >
        {categories.map(cat => (
          <option key={cat.value} value={cat.value}>{cat.label}</option>
        ))}
      </select>
      <input
        type="date"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        className="w-full px-4 py-2 text-base rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
      />
      <button
        type="submit"
        className="w-full px-4 py-2 text-base bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      >
        追加
      </button>
    </form>
  )
}

export default TodoInput
