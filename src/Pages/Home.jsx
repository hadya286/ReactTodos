import {Link} from "react-router-dom"
import {useContext} from "react"
import ThemeContext from "../Context/themeContext"

export const Home = () => {
  const {lang} = useContext(ThemeContext)
  return (
    // add negative margin to
    <div className="card" id={lang} style={{marginBottom: "-20px"}}>
      <h1 className="card-header">
        {lang === "en" ? "Users List" : "قائمة المستخدمين"}
      </h1>
      {/* three links react router links that leeads to 3 users */}

      <div className="userList">
        <Link className="userLink" to="/users/1">
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
        </Link>
      </div>
    </div>
  )
}

export default Home
