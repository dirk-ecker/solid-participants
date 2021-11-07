export default setStore => ({
  toggleParticipated (name) {
    setStore(
      'participants',
      participant => name === participant.name,
      participant => ({
        participated: !participant.participated,
        at: (participant.participated === true && '') ||
          (participant.participated === false && (participant.at || new Date().toJSON().substring(0, 10)))
      })
    )
  },

  changeAt (name, date) {
    setStore(
      'participants',
      participant => name === participant.name,
      'at', at => date
    )
  },

  deleteParticipant (name) {
    setStore('participants', p => {
      const index = p.findIndex(({name: n}) => name === n)
      return [
        ...p.slice(0, index),
        ...p.slice(index + 1)
      ]
    })
  }
})
