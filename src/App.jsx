import { createSignal , createEffect } from 'solid-js'
import { createStore } from 'solid-js/store'
import Participant from './Participant'

const createLocalStore = () => {
  const [store, setStore] = createStore({ participants: [] })
  if (localStorage.participants) setStore(JSON.parse(localStorage.participants))
  createEffect(() => (localStorage.participants = JSON.stringify(store)))
  return [store, setStore]
}

export default () => {
  const [store, setStore] = createLocalStore()
  const [participationSelection, setParticipationSelection] = createSignal('not-participated')

  const mailParticipants = () => {
    console.log('implement mailing', filteredParticipants())
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

  return (
    <>
      <h2>Participants List</h2>
      <div>
        <button
          onclick={importParticipants}
        >
          Import Participants
        </button>
        <button
          onClick={mailParticipants}
        >
          Mail Participants
        </button>

        <input
          type="radio"
          name="participation-selection"
          id="all"
          checked={participationSelection() === 'all'}
          onchange={() => setParticipationSelection('all')}
        />
        <label for="all">All</label>

        <input
          type="radio"
          name="participation-selection"
          id="participated"
          checked={participationSelection() === 'participated'}
          onchange={() => setParticipationSelection('participated')}
        />
        <label for="participated">Participated</label>

        <input
          type="radio"
          name="participation-selection"
          id="not-participated"
          checked={participationSelection() === 'not-participated'}
          onchange={() => setParticipationSelection('not-participated')}
        />
        <label for="not-participated">Not participated</label>
      </div>

      <ul>
        <For
          each={filteredParticipants()}
          fallback={'No Participants!'}
        >{ entry => (
          <li>
            <Participant model={entry} setStore={setStore}/>
          </li>
        )
        }</For>
      </ul>
    </>
  )
}

