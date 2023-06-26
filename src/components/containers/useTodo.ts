import { useEffect, useState } from 'react'
import { todoHttpReqHandler } from '../../http-handlers/todo'
import { Todo } from '../../types/todo'

export const useTodo = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalData, setModalData] = useState<{
    id: number
    type: string
    title: string
    body: string
  } | null>(null)

  const confirmCallback = () => {
    if (modalData?.type === 'archive') {
      todoHttpReqHandler
        .update(modalData.id, { archived: true })
        .then((updateTodo) => {
          setTodos((todos) =>
            todos.map((todo) => {
              if (todo.id === modalData.id) {
                return updateTodo
              }
              return todo
            })
          )
        })
    } else if (modalData?.type === 'unarchive') {
      todoHttpReqHandler
        .update(modalData.id, { archived: false })
        .then((updateTodo) => {
          setTodos((todos) =>
            todos.map((todo) => {
              if (todo.id === modalData.id) {
                return updateTodo
              }
              return todo
            })
          )
        })
    } else if (modalData?.type === 'delete') {
      todoHttpReqHandler.delete(modalData.id).then(() => {
        setTodos((prev) => prev.filter((todo) => todo.id !== modalData.id))
      })
    }
    setModalData(null)
    setIsOpen(false)
  }
  const cancelCallback = () => {
    setIsOpen(false)
  }
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

  const openModal = (id: number, type: string) => {
    if (type === 'archive') {
      setModalData({
        id: id,
        type: type,
        title: 'Archive',
        body: 'Are you sure you want to archive? '
      })
    } else if (type === 'unarchive') {
      setModalData({
        id: id,
        type: type,
        title: 'Unarchive',
        body: 'Are you sure you want to unarchive? '
      })
    } else if (type === 'delete') {
      setModalData({
        id: id,
        type: type,
        title: 'Delete',
        body: 'Are you sure you want to delete? '
      })
    }
    setIsOpen(true)
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

  const toggleArchiveStatus = (id: number, archived: boolean) => {
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
  }, [isOpen])

  return {
    todos,
    addTodo,
    deleteTodo,
    changeEditingStatus,
    toggleArchiveStatus,
    toggleCompleteStatus,
    cancelTodo,
    confirmTodo,
    isOpen,
    confirmCallback,
    cancelCallback,
    modalData,
    openModal
  }
}
