import {useContext, useState} from "react"
import {FiLock} from "react-icons/fi"
import ThemeContext from "../Context/themeContext"
import {Link, useParams} from "react-router-dom"
import {BiArrowBack} from "react-icons/bi"
import TodosContext from "../Context/todosContext"
import ThemeSwitch from "../Components/ThemeSwitch"

const About = () => {
  const [state1, setState1] = useState("")
  const [state2, setState2] = useState("")
  const [isError, setIsError] = useState("")
  const {lang} = useContext(ThemeContext)
  const {searchName, searchPin, changePin} = useContext(TodosContext)
  const {id} = useParams()

  // four digits
  // ^[0-9]{4}$

  const checkValidation = (e) => {
    setState2(e.target.value)
    console.log("state2", state2)
    console.log("state1", state1)
    if (state1 === state2) {
      setIsError("PINs match")
    } else {
      setIsError("Confirm PIN should match New PIN")
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
        }}
      >
        <input
          className="todo"
          type="password"
          value={state1}
          id="myInput1"
          placeholder={lang === "ar" ? "كلمة مرور جديدة" : "New PIN.."}
          onChange={(e) => setState1(e.target.value)}
          dir={lang === "ar" ? "rtl" : "ltr"}
        />
      </form>

      {/* //////////////////////////////////////////////////////////////// */}
      <form
        className="pinForm"
        onSubmit={(e) => {
          e.preventDefault()
          if (state2 !== "" && state2 === state1) {
            changePin(id, state2)
            alert("PIN changed")
            setState2("")
            setState1("")
          }
        }}
      >
        <input
          className="todo"
          type="password"
          value={state2}
          id="myInput2"
          placeholder={
            lang === "ar" ? "تأكيد كلمة المرور" : "Confirm New PIN.."
          }
          onChange={(e) => checkValidation(e)}
          dir={lang === "ar" ? "rtl" : "ltr"}
        />
      </form>
      <div className="error">{isError}</div>
      <div>
        <button
          className="btn btn3"
          type="submit"
          onClick={() => {
            changePin(id, state2)
            alert("PIN changed")
          }}
        >
          {lang === "ar" ? "تغيير كلمة المرور" : "Change PIN"}
        </button>
      </div>

      <div>
        <button
          className="btn btn3"
          type="submit"
          onClick={() => {
            changePin(id, "")
            alert("PIN deleted")
          }}
        >
          {lang === "ar" ? "الغاء كلمة المرور" : "Delete PIN"}
        </button>
      </div>

      <div style={{marginTop: "40px"}}>
        <ThemeSwitch />
      </div>
    </div>
  )
}

export default About
