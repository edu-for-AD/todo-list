function TodoArchiveBtn({ id, isArchive, setIsArchive, deleteTodo }) {
  return (
    <>
      {isArchive === false ? (
        <button
          onClick={() => {
            setIsArchive(!isArchive)
          }}
        >
          Archive
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              setIsArchive(!isArchive)
            }}
          >
            UnArchive
          </button>
          <button
            onClick={() => {
              deleteTodo(id)
            }}
          >
            Delete
          </button>
        </>
      )}
    </>
  )
}

export default TodoArchiveBtn
