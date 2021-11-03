export default properties => {
  const toggleParticipated = (name) => {
    properties.setStore(
      'participants',
      participant => name === participant.name,
      participant => ({
        participated: !participant.participated,
        at: (participant.participated === true && '') ||
          (participant.participated === false && (participant.at || new Date().toJSON().substring(0, 10)))
      })
    )
  }

  const changeAt = (name, date) => {
    properties.setStore(
      'participants',
      participant => name === participant.name,
      'at', at => date
    )
  }

  const deleteParticipant = (name) => {
    properties.setStore('participants', p => {
      const index = p.findIndex(({name: n}) => name === n)
      return [
        ...p.slice(0, index),
        ...p.slice(index + 1)
      ]
    })
  }

  return (
    <>
      <button
        onClick={[deleteParticipant, properties.model.name]}
      >
        x
      </button>
      { properties.model.name }
      <input
        type="checkbox"
        checked={properties.model.participated}
        onChange={[toggleParticipated, properties.model.name]}
      />
      <input
        type="date"
        value={properties.model.at}
        onChange={event => changeAt(properties.model.name, event.target.value)}
      />
    </>
  )
}
