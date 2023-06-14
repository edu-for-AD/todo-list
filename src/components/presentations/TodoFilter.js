function TodoFilter({
  filterArchive,
  setFilterArchive,
  filterComplete,
  setFilterComplete,
  // query,
  // setQuery,
  searchParams,
  setSearchParams
}) {
  const handleArchive = (event) => {
    setFilterArchive(event.target.value)
  }
  const handleComplete = (event) => {
    setFilterComplete(event.target.value)
  }
  return (
    <div>
      <div style={{ display: 'flex', width: '100%' }}>
        <label>
          <input
            type="radio"
            name="filterArchive"
            value="all"
            checked={filterArchive === 'all'}
            onChange={handleArchive}
          />
          all
        </label>
        <label>
          <input
            type="radio"
            name="filterArchive"
            value="archived"
            checked={filterArchive === 'archived'}
            onChange={handleArchive}
          />
          archived
        </label>
        <label>
          <input
            type="radio"
            name="filterArchive"
            value="unarchived"
            checked={filterArchive === 'unarchived'}
            onChange={handleArchive}
          />
          unarchived
        </label>
      </div>
      <div style={{ display: 'flex', width: '100%' }}>
        <label>
          <input
            type="radio"
            name="filterComplete"
            value="all"
            checked={filterComplete === 'all'}
            onChange={handleComplete}
          />
          all
        </label>
        <label>
          <input
            type="radio"
            name="filterComplete"
            value="completed"
            checked={filterComplete === 'completed'}
            onChange={handleComplete}
          />
          completed
        </label>
        <label>
          <input
            type="radio"
            name="filterComplete"
            value="uncompleted"
            checked={filterComplete === 'uncompleted'}
            onChange={handleComplete}
          />
          uncompleted
        </label>
      </div>
    </div>
  )
}

export default TodoFilter
