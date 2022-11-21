import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import {TodosProvider} from "./Context/todosContext"
import {ThemeProvider} from "./Context/themeContext"


const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <ThemeProvider>
      <TodosProvider>
        <App />
      </TodosProvider>
    </ThemeProvider>
  </React.StrictMode>
)
