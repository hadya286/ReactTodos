import {useContext, useState} from "react"
import {useParams} from "react-router-dom"
import {Link} from "react-router-dom"
import TodosContext from "../Context/todosContext"
import ThemeContext from "../Context/themeContext"

function UserPin() {
  const {lang} = useContext(ThemeContext)
  const {login, searchName} = useContext(TodosContext)
  const {id} = useParams()
  const [pinEntered, setPinEntered] = useState("")

  const handleChange = (e) => {
    setPinEntered(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    login(id, pinEntered)
  }

  return (
    <>
      {/* <div className="modal-background"></div> */}
      <div className="modal-content">
        <h2 className="card-header">
          {lang === "en"
            ? `Welcome ${searchName(id)}!`
            : `!${searchName(id)} أهلا`}
        </h2>
        <input
          className="modalInput"
          id={lang}
          type="password"
          style={{margin: "10px"}}
          placeholder={
            lang === "en"
              ? "Please enter PIN"
              : "الرجاء ادخال رقم التعريف الشخصي"
          }
          value={pinEntered}
          onChange={handleChange}
        />
        <button className="btn" onClick={handleSubmit}>
          {lang === "en" ? "Log in" : "تسجيل الدخول"}
        </button>
      </div>
      <Link id="cancelLogin" to="/">
        <button className="btn">x</button>
      </Link>
    </>
  )
}

export default UserPin
