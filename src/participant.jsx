import api from './participant-api'
/*
tr, td {
  padding: 0;
}
tr td div {
  max-height: 0;
  box-sizing: border-box;
  overflow: hidden;
  transition: max-height 0.3s, padding 0.3s;
}
tr.active td div {
  max-height: 100%;
  padding: 10px 10px;
  transition: max-height 0.6s, padding 0.6s;
}
*/

export default properties => {
  const methods = api(properties.setStore)
  return (
    <>
      <td>
        <div>
          { properties.model.name }
        </div>
      </td>
      <td class="w-25">
        <div>
          <input
            type="date"
            style="color: blue;"
            value={properties.model.at}
            onChange={event => methods.changeAt(properties.model.name, event.target.value)}
          />
        </div>
      </td>
      <td class="w-25">
        <div>
          <button
            type="button"
            className={ properties.model.participated ? 'btn btn-outline-success' : 'btn btn-outline-primary' }
            onClick={[methods.toggleParticipated, properties.model.name]}
          >
            <Show
              when={properties.model.participated}
              fallback={() => <div>&nbsp;&nbsp;&nbsp;&nbsp;</div>}
            >
              <i

                class={'bi-check-lg'}
                style={{ color: properties.model.participated ? 'btn-outline-primary' : 'btn-outline-success' }}
              />
            </Show>
          </button>
          <button
            type="button"
            class="btn btn-outline-danger ms-2"
            onClick={[methods.deleteParticipant, properties.model.name]}
          >
            <i class="bi-x-lg" />
          </button>
        </div>
      </td>
    </>
  )
}
