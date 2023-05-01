import { useState } from 'react'

function TodoFilter() {
  const [filterTodo, setFilterTodo] = useState('All')
  const handleChange = (event) => {
    setFilterTodo(event.target.value)
  }
  return (
    <div style={{ display: 'flex', width: '100%' }}>
      <input
        type="radio"
        name="filter"
        value="All"
        checked={filterTodo === 'All'}
        onChange={handleChange}
      />
      All
      <input
        type="radio"
        name="filter"
        value="Activated"
        checked={filterTodo === 'Activated'}
        onChange={handleChange}
      />
      Activated
      <input
        type="radio"
        name="filter"
        value="InActivated"
        checked={filterTodo === 'InActivated'}
        onChange={handleChange}
      />
      InActivated
    </div>
  )
}

export default TodoFilter
