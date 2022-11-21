import React, {useContext} from "react"
import ThemeContext from "../Context/themeContext"
import TodosContext from "../Context/todosContext"

const Pagination = () => {
  const pageNumbers = []
  const {lang} = useContext(ThemeContext)
  const {currentPage, postsPerPage, paginate, todos} = useContext(TodosContext)
  const totalPosts = todos.length

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className="navStyle">
      <ul className="navRow" id={lang}>
        <button
          className="btn pn"
          onClick={() => {
            const prevPage = currentPage - 1
            if (prevPage > 0) {
              paginate(prevPage)
            }
          }}
        >
          {lang === "ar" ? "السابق" : "Previous"}
        </button>
        {pageNumbers.map((number) => (
          <li
            key={number}
            style={{
              display: "inline",
              fontWeight: number === currentPage ? "bold" : "",
            }}
          >
            <a className="aStyle" onClick={() => paginate(number)} href="!#">
              {/* print out arabic numbers */}
              {lang === "ar" ? number.toLocaleString("ar-EG") : number}
              &nbsp; {/* this is a space */}
            </a>
          </li>
        ))}
        <button
          className="btn pn"
          onClick={() => {
            const nextPage = currentPage + 1
            if (nextPage <= pageNumbers.length) {
              paginate(nextPage)
            }
          }}
        >
          {lang === "ar" ? "التالي" : "Next"}
        </button>
      </ul>
    </nav>
  )
}

export default Pagination
