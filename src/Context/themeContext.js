import {createContext, useState} from "react"
import axios from "axios"

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState("dark")
  const [lang, setLang] = useState("en")

  const fetchTheme = (user) => {
    if (user) {
      const fetchMode = user.preference[0]
      const fetchLang = user.preference[1]
      setTheme(fetchMode)
      setLang(fetchLang)
    }
  }

  const toggleTheme = async (id) => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
    await axios.patch(`http://localhost:3001/users/${id}`, {
      preference: [theme === "light" ? "dark" : "light", lang],
    })
  }

  const toggleLang = async (curr, id) => {
    setLang(curr)
    await axios.patch(`http://localhost:3001/users/${id}`, {
      preference: [theme, curr],
    })
  }

  return (
    <ThemeContext.Provider
      value={{theme, toggleTheme, lang, setLang, toggleLang, fetchTheme}}
    >
      {children}
    </ThemeContext.Provider>
  )
}
export default ThemeContext
