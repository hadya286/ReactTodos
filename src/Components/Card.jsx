import React from "react"
import {useContext, useEffect} from "react"
import {useParams} from "react-router-dom"
import ThemeContext from "../Context/themeContext"
import TodosContext from "../Context/todosContext"

import Form from "./Form"
import Pagination from "./Pagination"
import Posts from "./Posts"
import ThemeSwitch from "./ThemeSwitch"
import UserPin from "./UserPin"

export const Card = () => {
  const {lang, fetchTheme} = useContext(ThemeContext)
  const {loggedIn, setLoggedIn, searchName, getCurrentUser} =
    useContext(TodosContext)

  // The useParams hook returns an object of key/value pairs of the dynamic params from the current URL that were matched by the <Route path>
  // use params
  const {id} = useParams()

  // upon rendering card component => it will set the todos to the user that is coming from the parameters (1, or 2, or 3)
  // upon change of 'id' state, set logged in to false and ask for password again
  useEffect(() => {
    setLoggedIn(false)
    // eslint-disable-next-line
  }, [id])

  useEffect(() => {
    console.log(id)
    fetchTheme(getCurrentUser(id))

    // eslint-disable-next-line
  }, [id])

  return (
    <div className="card" id={lang}>
      {!loggedIn && <UserPin id={id} />}
      {/* if not loggedin => pin component <UserPin> is displayed */}

      <h1 className="card-header">
        {lang === "en"
          ? `${searchName(id)}'s To Do List`
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
