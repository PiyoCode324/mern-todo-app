// Modal.jsx
function Modal({ onClose, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative bg-white dark:bg-gray-700 text-black dark:text-white p-6 rounded-xl shadow-xl w-full max-w-lg">
        {/* 閉じるボタンは右上固定 */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:text-gray-300 dark:hover:text-white text-xl"
          aria-label="閉じる"
          type="button"
        >
          ✖
        </button>
        {/* モーダル内容は縦に並べる */}
        <div className="flex flex-col space-y-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
