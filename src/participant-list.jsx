import { Index, For, createMemo, createSignal } from 'solid-js'
import Participant from './participant'

export default properties => {

  const pages = createMemo(() => {
    return new Array((Math.ceil(properties.participants.length / 10))).fill(0)
  })

  const [actualPage, setActualPage] = createSignal(0)

  const participants = () => properties.participants.slice(actualPage() * 10, (actualPage() + 1) * 10 - 1)

  const showFirstPage = () => setActualPage(0)
  const showPreviousPage = () => setActualPage(actualPage() > 0 ? actualPage() - 1 : actualPage())
  const showPage = (page) => setActualPage(page)
  const showNextPage = () => setActualPage(actualPage() < pages().length - 1 ? actualPage() + 1 : actualPage())
  const showLastPage = () => setActualPage(pages().length -1 )

  return (
    <div>
      <table class="table table-striped table-hover table-bordered">
        <thead class="table-dark">
        <tr>
          <th scope="col">Name</th>
          <th scope="col w-25">Participated at</th>
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        <For
          each={participants()}
          fallback={'No Participants!'}
        >{ entry => (
          <tr>
            <Participant model={entry} setStore={properties.setStore}/>
          </tr>
        )
        }</For>
        </tbody>
      </table>
      <nav>
        <ul class="pagination">
          <li class="page-item" onClick={showFirstPage}>
            <a class="page-link">
              <i class="bi-chevron-bar-left"/>
            </a>
          </li>
          <li class="page-item" onClick={showPreviousPage}>
            <a class="page-link">
              <i class="bi-chevron-left"/>
            </a>
          </li>
          <Index
            each={pages()}
          >{(p, index) => (
            <li
              class={index === actualPage() ? 'page-item active' : 'page-item'}
              onClick={[showPage, index]}
            >
              <a class="page-link">{index + 1}</a>
            </li>
          )}</Index>
          <li class="page-item" onClick={showNextPage}>
            <a class="page-link">
              <i class="bi-chevron-right"/>
            </a>
          </li>
          <li class="page-item" onClick={showLastPage}
          >
            <a class="page-link">
              <i class="bi-chevron-bar-right"/>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  )
}
