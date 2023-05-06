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
          checked={filterArchive === 'all'}
          onChange={handleChangeArchive}
        />
        all
        <input
          type="radio"
          name="filterArchive"
          value="Archived"
          checked={filterArchive === 'archived'}
          onChange={handleChangeArchive}
        />
        archived
        <input
          type="radio"
          name="filterArchive"
          value="Unarchived"
          checked={filterArchive === 'unarchived'}
          onChange={handleChangeArchive}
        />
        unarchived
      </div>
      <div style={{ display: 'flex', width: '100%' }}>
        <input
          type="radio"
          name="filterActivate"
          value="All"
          checked={filterActivate === 'all'}
          onChange={handleChangeActivate}
        />
        all
        <input
          type="radio"
          name="filterActivate"
          value="Activated"
          checked={filterActivate === 'activated'}
          onChange={handleChangeActivate}
        />
        activated
        <input
          type="radio"
          name="filterActivate"
          value="Inactivated"
          checked={filterActivate === 'inactivated'}
          onChange={handleChangeActivate}
        />
        inactivated
      </div>
    </div>
  )
}

export default TodoFilter
