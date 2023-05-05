import { useState } from 'react'

function TodoFilter() {
  const [filterArchive, setFilterArchive] = useState('All')
  const [filterActivate, setFilterActivate] = useState('All')
  const handleChangeArchive = (event) => {
    setFilterArchive(event.target.value)
  }
  const handleChangeActivate = (event) => {
    setFilterActivate(event.target.value)
  }
  return (
    <div>
      <div style={{ display: 'flex', width: '100%' }}>
        <input
          type="radio"
          name="filterArchive"
          value="All"
          checked={filterArchive === 'All'}
          onChange={handleChangeArchive}
        />
        All
        <input
          type="radio"
          name="filterArchive"
          value="Archived"
          checked={filterArchive === 'Archived'}
          onChange={handleChangeArchive}
        />
        Activated
        <input
          type="radio"
          name="filterArchive"
          value="Unarchived"
          checked={filterArchive === 'Unarchived'}
          onChange={handleChangeArchive}
        />
        InActivated
      </div>
      <div style={{ display: 'flex', width: '100%' }}>
        <input
          type="radio"
          name="filterActivate"
          value="All"
          checked={filterActivate === 'All'}
          onChange={handleChangeActivate}
        />
        All
        <input
          type="radio"
          name="filterActivate"
          value="Activated"
          checked={filterActivate === 'Activated'}
          onChange={handleChangeActivate}
        />
        Activated
        <input
          type="radio"
          name="filterActivate"
          value="Inactivated"
          checked={filterActivate === 'Inactivated'}
          onChange={handleChangeActivate}
        />
        InActivated
      </div>
    </div>
  )
}

export default TodoFilter
