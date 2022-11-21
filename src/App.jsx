import React, {useContext} from "react"
import {Card} from "./Components/Card"
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./Pages/Home"
import ThemeContext from "./Context/themeContext"

function App() {
  const {theme} = useContext(ThemeContext)

  return (
    <Router>
      <div className="App" id={theme}>
        <Home />

        {/* replaces switch */}
        <Routes>
          <Route path="/users/:id" element={<Card />} />
        </Routes>
      </div>
    </Router>
  )
}
export default App
