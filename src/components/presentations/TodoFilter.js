function TodoFilter({
  archivedFilter,
  setArchivedFilter,
  activatedFilter,
  setActivatedFilter
}) {
  const handleArchivedOptionChange = (event) => {
    setArchivedFilter(event.target.value)
  }
  const handleActivatedOptionChange = (event) => {
    setActivatedFilter(event.target.value)
  }

  return (
    <div style={{ width: '100%' }}>
      <div>
        <label>
          <input
            type="radio"
            value="all"
            checked={archivedFilter === 'all'}
            onChange={handleArchivedOptionChange}
          />
          all
        </label>
        <label>
          <input
            type="radio"
            value="archived"
            checked={archivedFilter === 'archived'}
            onChange={handleArchivedOptionChange}
          />
          archived
        </label>
        <label>
          <input
            type="radio"
            value="unarchived"
            checked={archivedFilter === 'unarchived'}
            onChange={handleArchivedOptionChange}
          />
          unarchived
        </label>
      </div>

      <div>
        <label>
          <input
            type="radio"
            value="all"
            checked={activatedFilter === 'all'}
            onChange={handleActivatedOptionChange}
          />
          all
        </label>
        <label>
          <input
            type="radio"
            value="activated"
            checked={activatedFilter === 'activated'}
            onChange={handleActivatedOptionChange}
          />
          activated
        </label>
        <label>
          <input
            type="radio"
            value="inactivated"
            checked={activatedFilter === 'inactivated'}
            onChange={handleActivatedOptionChange}
          />
          inactivated
        </label>
      </div>
    </div>
  )
}

export default TodoFilter
