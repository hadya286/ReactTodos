import ReactSwitch from "react-switch"
import {useContext} from "react"
import ThemeContext from "../Context/themeContext"
import {useParams} from "react-router-dom"

// darkMode/lightMode switch & ar/en dropdown
function ThemeSwitch() {
  const {theme, toggleTheme, toggleLang} = useContext(ThemeContext)
  const {id} = useParams()
  return (
    <div>
      <div className="switch">
        <label className="switchLabel">
          {theme === "light" ? "Light Mode" : "Dark Mode"}
        </label>
        <ReactSwitch
          onChange={() => toggleTheme(id)}
          checked={theme === "dark"}
        />
      </div>

      <div>
        <select
          id="lang"
          className="dropdown"
          onChange={(e) => {
            toggleLang(e.target.value, id)
          }}
        >
          <option id="en" value="en">
            English
          </option>
          <option id="ar" value="ar">
            العربية
          </option>
        </select>
      </div>
    </div>
  )
}

export default ThemeSwitch
