// TodoListコンポーネント
function TodoList({ todos, toggleTodo, deleteTodo, loading, error }) {
  if (loading)
    return <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">読み込み中...</p>

  if (error)
    return <p className="text-red-500 dark:text-red-400 text-base sm:text-lg">エラーが発生しました: {error.message || error}</p>

  if (todos.length === 0)
    return <p className="text-gray-500 dark:text-gray-400 text-base sm:text-lg">タスクがありません</p>

  return (
    <ul className="space-y-4">
      {todos.map(todo => (
        <li
          key={todo._id}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-gray-700 p-4 rounded-lg shadow"
        >
          <div className="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo._id)}
              className="w-5 h-5 accent-indigo-600"
            />
            <div>
              <span
                className={`text-base sm:text-lg ${
                  todo.completed ? 'line-through text-gray-400' : 'text-gray-800 dark:text-white'
                }`}
              >
                {todo.text}
              </span>
              <div className="flex flex-wrap gap-4 mt-1 text-sm text-gray-500 dark:text-gray-300">
                {todo.category && (
                  <span className="bg-blue-100 dark:bg-blue-800 px-2 py-0.5 rounded">
                    カテゴリ: {todo.category}
                  </span>
                )}
                {todo.deadline && (
                  <span>
                    期限: {new Date(todo.deadline).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          <button
            onClick={() => deleteTodo(todo._id)}
            className="text-base sm:text-sm text-white bg-red-600 dark:bg-red-500 hover:bg-red-700 dark:hover:bg-red-600 rounded px-3 py-1 transition"
          >
            削除
          </button>
        </li>
      ))}
    </ul>
  )
}

export default TodoList;
