import React from 'react'
import {FaUser} from 'react-icons/fa'
import {useContext, useEffect} from 'react'
import {useParams, Link} from 'react-router-dom'
import ThemeContext from '../Context/themeContext'
import TodosContext from '../Context/todosContext'

import Form from './Form'
import Pagination from './Pagination'
import Posts from './Posts'
import DraggableList from './Posts.jsx'

import ThemeSwitch from './ThemeSwitch'
import UserPin from './UserPin'
import UserTab from './UserTab'

export const Card = () => {
  const {lang, fetchTheme} = useContext(ThemeContext)
  const {loggedIn, setLoggedIn, searchName, fetchUsers, login, getCurrentUser} =
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
    fetchTheme(getCurrentUser(id))

    // eslint-disable-next-line
  }, [id])

  return (
    <>
      <UserTab />

      <div className='card' id={lang}>
        {/* if not loggedin => <UserPin> component is displayed */}
        {!loggedIn && <UserPin id={id} />}

        {/* if not loggedIn => use the blurCard classname */}
        <div className={!loggedIn && 'blurCard'}>
          <h1 className='card-header'>
            <Link to={`/users/about/${id}`}>
              <FaUser className='userIcon' />
            </Link>
            {lang === 'en'
              ? `${searchName(id)}'s To Do List`
              : `${searchName(id)} قائمة مهام`}
          </h1>
          {/* The form to enter the todo */}
          <Form />

          {/* The todos */}
          {/* <Posts /> */}

          <DraggableList items={['item1', 'item2', 'item3']} />

          {/* The pagination numbering at the bottom */}
          <Pagination />

          {/* Switch for theme and language */}
          <ThemeSwitch />
        </div>
        {/* {!loggedIn && </div>} */}
      </div>
    </>
  )
}
