function TodoFilter({
  filterArchive,
  setFilterArchive,
  filterActivate,
  setFilterActivate
}) {
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
        Archived
        <input
          type="radio"
          name="filterArchive"
          value="Unarchived"
          checked={filterArchive === 'Unarchived'}
          onChange={handleChangeArchive}
        />
        Unarchived
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
        Inactivated
      </div>
    </div>
  )
}

export default TodoFilter