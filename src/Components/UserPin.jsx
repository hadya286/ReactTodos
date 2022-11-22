import {useContext, useState} from "react"
import TodosContext from "../Context/todosContext"
import {useParams} from "react-router-dom"

function UserPin() {
  const {login} = useContext(TodosContext)
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
      <div className="modal-background"></div>
      <div className="modal-content">
        <input
          type="password"
          style={{margin: "10px"}}
          placeholder="Please enter PIN"
          value={pinEntered}
          onChange={handleChange}
        />
        <button className="btn" onClick={handleSubmit}>
          Log in
        </button>
      </div>
    </>
  )
}

export default UserPin
