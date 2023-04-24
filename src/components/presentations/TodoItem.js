function TodoItem({ id, text, deleteTodo, archived, toggleArchiveStatus }) {
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <div>{text}</div>
      <button
        onClick={() => {
          toggleArchiveStatus(id)
        }}
      >
        {archived ? 'unarchive' : 'archive'}
      </button>
      {archived && (
        <button
          onClick={() => {
            deleteTodo(id)
          }}
        >
          delete
        </button>
      )}
    </div>
  )
}

export default TodoItem
