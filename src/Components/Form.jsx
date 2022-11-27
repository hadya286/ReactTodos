import {useContext} from "react"
import TodosContext from "../Context/todosContext"
import ThemeContext from "../Context/themeContext"
import {useParams} from "react-router-dom"

const Form = () => {
  const {todo, setTodo, handleSubmit, editId} = useContext(TodosContext)
  const {lang} = useContext(ThemeContext)
  const {id} = useParams()

  return (
    <form
      className="todoform"
      onSubmit={(e) => {
        e.preventDefault()
        handleSubmit(id)
      }}
    >
      <input
        className="titleInput"
        type="text"
        value={todo}
        id="myInput"
        placeholder={lang === "ar" ? "عنوان" : "Title.."}
        onChange={(e) => setTodo(e.target.value)}
        dir={lang === "ar" ? "rtl" : "ltr"}
      />
      <button className="btn" type="submit">
        {editId && lang === "en"
          ? "Edit"
          : editId && lang === "ar"
          ? "تعديل"
          : lang === "en"
          ? "Add"
          : "إضافة"}
      </button>
    </form>
  )
}

export default Form
