import React, {useContext} from "react"
import TodosContext from "../Context/todosContext"
import ThemeContext from "../Context/themeContext"

// we imported-

// 'todos': as props that represent the 'todos' state we have in our app.jsx,
// 'loading': indicates the 'loading state of our app
// 'handleEdit' and 'handleDelete': functions that we will pass to our 'posts' component

const Posts = () => {
  const {lang} = useContext(ThemeContext)
  const {loading, handleDelete, handleEdit, currentPosts} =
    useContext(TodosContext)

  if (loading) {
    return <h2>Loading..</h2>
  }

  return (
    <ul>
      {currentPosts.map((t) => (
        <li className="singleTodo" key={t.id}>
          <span className="todoText">{t.todo}</span>
          <button className="btn2" onClick={() => handleEdit(t.id)}>
            {lang === "ar" ? "تعديل" : "Edit"}
          </button>
          <button className="btn2" onClick={() => handleDelete(t.id)}>
            {lang === "ar" ? "إزالة" : "Remove"}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default Posts
