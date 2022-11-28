import {useContext, useState} from "react"
import ThemeContext from "../Context/themeContext"
import {Link, useParams} from "react-router-dom"
import TodosContext from "../Context/todosContext"
import ThemeSwitch from "../Components/ThemeSwitch"

const About = () => {
  const [newPin, setNewPin] = useState("")
  const {lang} = useContext(ThemeContext)
  const {searchName, changePin} = useContext(TodosContext)
  const {id} = useParams()

  return (
    <div className="card">
      <h2 className="card-header">
        {lang === "en" ? `About ${searchName(id)}` : `${searchName(id)} عن`}
      </h2>
      <form
        className="pinForm"
        onSubmit={(e) => {
          e.preventDefault()
          if (newPin !== "") {
            changePin(id, newPin)
            setNewPin("")
          }
        }}
      >
        <input
          className="todo"
          type="password"
          value={newPin}
          id="myInput"
          placeholder={lang === "ar" ? "كلمة مرور جديدة" : "New PIN.."}
          onChange={(e) => setNewPin(e.target.value)}
          dir={lang === "ar" ? "rtl" : "ltr"}
        />
        <button
          className="btn"
          type="submit"
          style={{width: "30%", marginLeft: "10px"}}
        >
          {lang === "ar" ? "تغيير كلمة المرور" : "Change PIN"}
        </button>
      </form>
      <button
        className="btn"
        type="submit"
        onClick={() => {
          changePin(id, "")
          alert("PIN deleted")
        }}
        style={{width: "30%", marginTop: "-30px"}}
      >
        {lang === "ar" ? "الغاء كلمة المرور" : "Delete PIN"}
      </button>
      <div style={{marginTop: "40px"}}>
        <ThemeSwitch />
      </div>
      <Link to={`/users/${id}`}>back</Link>
    </div>
  )
}

export default About
