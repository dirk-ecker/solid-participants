// import * as bootstrap from 'bootstrap'
import { createSignal , createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import ParticipantList from './participant-list'

const createLocalStore = () => {
  const [store, setStore] = createStore({ participants: [] })
  if (localStorage.participants) setStore(JSON.parse(localStorage.participants))
  createEffect(() => (localStorage.participants = JSON.stringify(store)))
  return [store, setStore]
}

export default () => {
  const [store, setStore] = createLocalStore()
  const [participationSelection, setParticipationSelection] = createSignal('not-participated')
  const [selectedDate, setSelectedDate] = createSignal()

  const mailParticipants = () => {
    console.log('implement mailing', filteredParticipants())
  }

  const dateSelected = (date) => {
    setSelectedDate(date)
  }

  const importParticipants = async () => {
    const [FileSystemFileHandle] = await window.showOpenFilePicker()
    const file = await FileSystemFileHandle.getFile()
    const contents = await file.text()
    setStore('participants', participants => {
      const mergedParticipants = [
        ...participants,
        ...contents.split('\n')
          .filter(value => value)
          .map(name => ({ name, participated: false }))
      ]
      mergedParticipants.sort(({ name: firstName }, { name: secondName }) =>
        firstName < secondName ? -1 : (firstName > secondName ? 1 : 0)
      )
      return mergedParticipants
    })
  }

  const filteredParticipants = () =>
    store.participants.filter(({ participated }) =>
      participationSelection() === 'all' ||
      (participated && participationSelection() === 'participated') ||
      (!participated && participationSelection() === 'not-participated')
    )

  const selectedParticipants = () =>
    !selectedDate()
      ? filteredParticipants()
      : filteredParticipants().filter(({ at }) => at === selectedDate())

  const numberOfParticipants = () => selectedParticipants().length

  const participitationDates = () => {
    const allDates = filteredParticipants()
      .map(({ at }) => at)
      .filter(value => value)
    const uniqueDates = new Set(allDates.sort())
    setSelectedDate()
    return ['', ...uniqueDates]
  }

  return (
    <div class="container" style="font-size: 125%;">
      {/* header */}
      <div class="row" style="background-color: lightgrey; margin: 0; padding: 10px;">
        <div class="col-4" />
        <div class="col-1">
          <img src="src/assets/images/logo.png" alt="Logo" width="50" class="d-inline-block"/>
        </div>
        <div class="col-4">
          <h1>Participants List</h1>
        </div>
        <div class="col-3"/>
      </div>

      {/* filter */}
      <div class="row" >
        <div class="col-2">
          <label>Participants</label>
        </div>
        <div class="col">
          <div class="form-check form-check-inline">
            <input
              type="radio"
              name="participation-selection"
              id="all"
              class="form-check-input"
              checked={participationSelection() === 'all'}
              onChange={() => setParticipationSelection('all')}
            />
            <label class="form-check-label" htmlFor="all">All</label>
          </div>
        </div>

        <div class="col">
          <div class="form-check form-check-inline">
            <input
              type="radio"
              name="participation-selection"
              id="participated"
              class="form-check-input"
              checked={participationSelection() === 'participated'}
              onChange={() => setParticipationSelection('participated')}
            />
            <label class="form-check-label" htmlFor="participated">Participated</label>
          </div>
        </div>

        <div class="col form-check form-check-inline">
          <input
            type="radio"
            name="participation-selection"
            id="not-participated"
            class="form-check-input"
            checked={participationSelection() === 'not-participated'}
            onChange={() => setParticipationSelection('not-participated')}
          />
          <label class="form-check-label" htmlFor="not-participated">Not participated</label>
        </div>
      </div>

      {/* date selection */}
      <div class="row">
        <div class="col-2">
          <label>Date</label>
        </div>
        <div class="col-1">
          <select class="form-select" onClick={(event) => dateSelected(event.target.value)}>
            <For
              each={participitationDates()}
            >
              {entry =>
                <option
                  value={entry}
                  label={entry || 'All'}
                >
                  {entry}
                </option>
              }</For>
          </select>
        </div>
      </div>

      {/* list of participants */}
      <div class="row">
        <div class="col">
          <ParticipantList participants={selectedParticipants()} setStore={setStore}/>
        </div>
      </div>

      {/* statistics */}
      <div class="row">
        <div class="col">
          Participants ({numberOfParticipants()})
        </div>
      </div>

      {/* buttons */}
      <div class="row">
        <div class="col-1">
          <button
            class="btn btn-danger text-nowrap"
            type="button"
            onClick={importParticipants}
          >
            <i class="bi-file-earmark-spreadsheet"/>
          </button>
        </div>
        <div class="col-1">
          <button
            class="btn btn-warning text-nowrap"
            type="button"
            onClick={mailParticipants}
          >
            <i class="bi-envelope"/>
          </button>
        </div>
      </div>
    </div>
  )
}
