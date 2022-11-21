import {createContext, useState} from "react"

const ThemeContext = createContext()

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState("dark")
  const [lang, setLang] = useState("en")

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"))
  }

  return (
    <ThemeContext.Provider value={{theme, toggleTheme, lang, setLang}}>
      {children}
    </ThemeContext.Provider>
  )
}
export default ThemeContext
