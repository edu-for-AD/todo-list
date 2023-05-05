function TodoEditBtn({ id, text, isEdit, setIsEdit, modifiedTodo }) {
  return (
    <>
      {isEdit === false ? (
        <button
          onClick={() => {
            setIsEdit(!isEdit)
          }}
        >
          Edit
        </button>
      ) : (
        <>
          <button
            onClick={() => {
              modifiedTodo(id, text)
              setIsEdit(!isEdit)
            }}
          >
            confirm
          </button>
          <button
            onClick={() => {
              setIsEdit(!isEdit)
            }}
          >
            Cancel
          </button>
        </>
      )}
    </>
  )
}

export default TodoEditBtn
