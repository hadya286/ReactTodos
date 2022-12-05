import {useContext, useState} from "react"
import {FiLock} from "react-icons/fi"
import ThemeContext from "../Context/themeContext"
import {Link, useParams} from "react-router-dom"
import {BiArrowBack} from "react-icons/bi"
import TodosContext from "../Context/todosContext"
import ThemeSwitch from "../Components/ThemeSwitch"

const About = () => {
  const [newPin, setNewPin] = useState("")
  const [confirmNewPin, setConfirmNewPin] = useState("")
  const {lang} = useContext(ThemeContext)
  const {searchName, searchPin, changePin} = useContext(TodosContext)
  const {id} = useParams()

  const checkValidation = (e) => {
    setConfirmNewPin(e.target.value)
    if (newPin !== confirmNewPin) {
      alert("Confirm PIN should match your new PIN")
    }
  }

  return (
    <div className="card">
      <h2 className="card-header" style={{display: "flex"}}>
        <Link to={`/users/${id}`}>
          <BiArrowBack className="arrowIcon" size={35} />
        </Link>
        {lang === "en" ? `About ${searchName(id)}` : `${searchName(id)} عن`}
      </h2>
      <div>
        <h4 className="card-header" style={{alignItems: "right"}}>
          {lang === "en"
            ? `Old Pin: ${searchPin(id)}`
            : `${searchPin(id)} :كلمة المرور السابقة`}
        </h4>
      </div>

      <form
        className="pinForm"
        onSubmit={(e) => {
          e.preventDefault()
          if (newPin !== "") {
            changePin(id, newPin)
            alert("Confirm New PIN")
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
          style={{
            width: "30%",
            marginLeft: "10px",
            marginRight: "10px",
            height: "40px",
          }}
        >
          {lang === "ar" ? "تغيير كلمة المرور" : "Change PIN"}
        </button>
      </form>

      {/* //////////////////////////////////////////////////////////////// */}
      {/* Confirming new pin */}
      <form
        className="pinForm"
        onSubmit={(e) => {
          e.preventDefault()
          if (confirmNewPin !== "" && confirmNewPin === newPin) {
            changePin(id, confirmNewPin)
            alert("PIN changed")
            setConfirmNewPin("")
            setNewPin("")
          }
        }}
      >
        <input
          className="todon"
          type="password"
          value={confirmNewPin}
          id="myInput"
          placeholder={
            lang === "ar" ? "تأكيد كلمة المرور" : "Confirm New PIN.."
          }
          onChange={(e) => checkValidation(e)}
          dir={lang === "ar" ? "rtl" : "ltr"}
        />
        <button
          className="btn"
          type="submit"
          style={{
            width: "30%",
            marginLeft: "10px",
            marginRight: "10px",
            height: "40px",
          }}
        >
          {lang === "ar" ? "تأكيد كلمة المرور" : "Confirm PIN"}
        </button>
      </form>

      <button
        className="btn"
        type="submit"
        onClick={() => {
          changePin(id, "")
          alert("PIN deleted")
        }}
        style={{
          width: "30%",
          marginTop: "-30px",
        }}
      >
        {lang === "ar" ? "الغاء كلمة المرور" : "Delete PIN"}
      </button>
      <div style={{marginTop: "40px"}}>
        <ThemeSwitch />
      </div>
    </div>
  )
}

export default About
