import React from "react"
import {useContext, useEffect} from "react"
import Form from "./Form"
import Posts from "./Posts"
import Pagination from "./Pagination"
import ThemeSwitch from "./ThemeSwitch"
import ThemeContext from "../Context/themeContext"
import {useParams} from "react-router-dom"
import TodosContext from "../Context/todosContext"
import UserPin from "./UserPin"

export const Card = () => {
  const {lang} = useContext(ThemeContext)
  const {loggedIn, setLoggedIn, searchName} = useContext(TodosContext)

  // use params
  const {id} = useParams()

  // upon rendering card component => it will set the todos to the user that is coming from the parameters (1, or 2, or 3)
  useEffect(() => {
    setLoggedIn(false)
    // eslint-disable-next-line
  }, [id])

  return (
    <div className="card" id={lang}>
      {!loggedIn && <UserPin id={id} />}
      <h1 className="card-header">
        {lang === "en"
          ? `${searchName(id)} To Do List`
          : `${searchName(id)} قائمة مهام`}
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
