import Participant from './participant'

export default properties => {
  return (
    <div>
      <table className="table table-striped table-hover table-bordered">
        <thead class="table-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col w-25">Participated at</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <For
          each={properties.participants}
          fallback={'No Participants!'}
        >{ entry => (
          <tr>
            <Participant model={entry} setStore={properties.setStore}/>
          </tr>
        )
        }</For>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
        <ul className="pagination">
          <li className="page-item"><a className="page-link" href="#">Previous</a></li>
          <li className="page-item"><a className="page-link" href="#">1</a></li>
          <li className="page-item"><a className="page-link" href="#">2</a></li>
          <li className="page-item"><a className="page-link" href="#">3</a></li>
          <li className="page-item"><a className="page-link" href="#">Next</a></li>
        </ul>
      </nav>
    </div>
  )
}
