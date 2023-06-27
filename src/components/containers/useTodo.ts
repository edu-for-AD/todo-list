import { useEffect, useState } from 'react'
import { modalTypes } from '../../constants/modal'
import { todoHttpReqHandler } from '../../http-handlers/todo'
import { Todo } from '../../types/todo'

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [modalData, setModalData] = useState<{
    isOpen: boolean
    id: number
    type: string
    title: string
    body: string
  } | null>(null)

  const addTodo = (title: string, description: string) => {
    todoHttpReqHandler.add(title, description).then((todo) => {
      setTodos([...todos, todo])
    })
  }

  const deleteTodo = (id: number) => {
    todoHttpReqHandler.delete(id).then(() => {
      setTodos((prev) => prev.filter((todo) => todo.id !== id))
    })
  }

  const changeArchiveStatus = (id: number, archived: boolean) => {
    todoHttpReqHandler
      .update(id, { archived: !archived })
      .then((updateTodo) => {
        setTodos((todos) =>
          todos.map((todo) => {
            if (todo.id === id) {
              return updateTodo
            }
            return todo
          })
        )
      })
  }

  const confirmModalCallback = () => {
    if (modalData?.type === modalTypes.ARCHIVE) {
      changeArchiveStatus(modalData.id, false)
    } else if (modalData?.type === modalTypes.UNARCHIVE) {
      changeArchiveStatus(modalData.id, true)
    } else if (modalData?.type === modalTypes.DELETE) {
      deleteTodo(modalData.id)
    }
    setModalData(null)
  }

  const cancelModalCallback = () => {
    setModalData(null)
  }

  const openModal = (id: number, type: string) => {
    if (type === modalTypes.ARCHIVE) {
      setModalData({
        isOpen: true,
        id: id,
        type: type,
        title: 'Archive',
        body: 'Are you sure you want to archive? '
      })
    } else if (type === modalTypes.UNARCHIVE) {
      setModalData({
        isOpen: true,
        id: id,
        type: type,
        title: 'Unarchive',
        body: 'Are you sure you want to unarchive? '
      })
    } else if (type === modalTypes.DELETE) {
      setModalData({
        isOpen: true,
        id: id,
        type: type,
        title: 'Delete',
        body: 'Are you sure you want to delete? '
      })
    }
  }

  const changeEditingStatus = (id: number) => {
    setTodos((todos) =>
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, editing: !todo.editing }
        }

        if (todo.editing === true) {
          return { ...todo, editing: false }
        }

        return todo
      })
    )
  }

  const toggleCompleteStatus = (id: number, completed: boolean) => {
    todoHttpReqHandler
      .update(id, { completed: !completed })
      .then((updateTodo) => {
        setTodos((todos) =>
          todos.map((todo) => {
            if (todo.id === id) {
              return updateTodo
            }
            return todo
          })
        )
      })
  }

  const cancelTodo = (id: number) => {
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, editing: false } : todo))
    )
  }

  const confirmTodo = (
    id: number,
    editingTodo: string,
    editingDescription: string
  ) => {
    todoHttpReqHandler
      .update(id, { title: editingTodo, description: editingDescription })
      .then((updatedTodo) => {
        setTodos((todos) =>
          todos.map((todo) => {
            if (todo.id === id) {
              return updatedTodo
            }

            return todo
          })
        )
      })
  }

  useEffect(() => {
    todoHttpReqHandler.getAll().then((result) => {
      setTodos(result)
    })
  }, [])

  return {
    todos,
    addTodo,
    changeEditingStatus,
    toggleCompleteStatus,
    cancelTodo,
    confirmTodo,
    confirmModalCallback,
    cancelModalCallback,
    modalData,
    openModal
  }
}
