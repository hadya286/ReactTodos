import {Link} from "react-router-dom"
import {useContext} from "react"
import ThemeContext from "../Context/themeContext"
import TodosContext from "../Context/todosContext"

export const UserTab = () => {
  const {lang} = useContext(ThemeContext)
  const {users} = useContext(TodosContext)
  return (
    // add negative margin to
    <div className="card" id={lang} style={{marginBottom: "-20px"}}>
      <h1 className="card-header">
        {lang === "en" ? "Users List" : "قائمة المستخدمين"}
      </h1>

      <div className="userList">
        {users.map((user) => (
          <Link key={user.id} className="userLink" to={`/users/${user.id}`}>
            <button className="btn">{`${user.name}`}</button>
          </Link>
        ))}

        {/* three links react router links that leads to 3 users */}
        {/* <Link className="userLink" to="/users/1">
          <button className="btn">
            {lang === "en" ? "User 1" : "المستخدم ١"}
          </button>
        </Link>
        <Link className="userLink" to="/users/2">
          <button className="btn">
            {lang === "en" ? "User 2" : "المستخدم ٢"}
          </button>
        </Link>
        <Link className="userLink" to="/users/3">
          <button className="btn">
            {lang === "en" ? "User 3" : "المستخدم ٣	"}
          </button>
        </Link> */}
      </div>
    </div>
  )
}

export default UserTab
