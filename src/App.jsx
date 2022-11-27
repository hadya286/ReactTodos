import React, {useContext, useEffect} from "react"
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import "./App.css"
import {Card} from "./Components/Card"
import ThemeContext from "./Context/themeContext"
import TodosContext from "./Context/todosContext"
import UserTab from "./Components/UserTab"

function App() {
  const {theme} = useContext(ThemeContext)
  const {fetchUsers, todos} = useContext(TodosContext)

  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line
  }, [todos])

  return (
    <Router>
      <div className="App" id={theme}>
        <UserTab />

        {/* routes replaces switch */}
        <Routes>
          <Route path="/users/:id" element={<Card />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App
