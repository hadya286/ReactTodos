import {useContext} from "react"
import TodosContext from "../Context/todosContext"
import ThemeContext from "../Context/themeContext"

const Form = () => {
  const {todo, setTodo, handleSubmit, editId} = useContext(TodosContext)
  const {lang} = useContext(ThemeContext)

  return (
    <form className="todoform" onSubmit={handleSubmit}>
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
