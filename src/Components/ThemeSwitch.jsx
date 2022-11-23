import ReactSwitch from "react-switch"
import {useContext} from "react"
import ThemeContext from "../Context/themeContext"

// darkMode/lightMode switch & ar/en dropdown
function ThemeSwitch() {
  const {theme, toggleTheme, setLang} = useContext(ThemeContext)
  return (
    <div>
      <div className="switch">
        <label>{theme === "light" ? "Light Mode" : "Dark Mode"}</label>
        <ReactSwitch onChange={toggleTheme} checked={theme === "dark"} />
      </div>

      <div>
        <select
          id="lang"
          className="dropdown"
          onChange={(e) => {
            setLang(e.target.value)
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
