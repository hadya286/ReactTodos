import React from "react"
import {useContext} from "react"
import Form from "./Form"
import Posts from "./Posts"
import Pagination from "./Pagination"
import ThemeSwitch from "./ThemeSwitch"
import ThemeContext from "../Context/themeContext"
import {useParams} from "react-router-dom"

export const Card = () => {
  const {lang} = useContext(ThemeContext)

  // use params
  const {id} = useParams()

  console.log(id)

  return (
    <div className="card" id={lang}>
      <h1 className="card-header">
        {lang === "en" ? "My To Do List" : "قائمة المهام الخاصة بي"}
      </h1>

      {/* The form to enter the todo */}
      <Form />

      {/* The todos */}
      <Posts />

      {/* The pagination numbering at the bottom */}
      <Pagination />

      {/* Switch for theme and language */}
      <ThemeSwitch />
    </div>
  )
}
