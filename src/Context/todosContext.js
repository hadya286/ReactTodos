import axios from 'axios'
import {createContext, useEffect, useState} from 'react'

const TodosContext = createContext()

export const TodosProvider = ({children}) => {
  // eslint-disable-next-line
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)

  // set todos for the user
  const [todos, setTodos] = useState([])
  const [loggedIn, setLoggedIn] = useState(false) // this is the state for the login page
  const [todo, setTodo] = useState('') // this is the state for the input field
  const [editId, setEditId] = useState(0) // this is the state for the edit button

  const [currentPage, setCurrentPage] = useState(1) // this is the state for which page we are on
  const [postsPerPage] = useState(5) // this is the state for how many todos we want in each page

  const indexOfLastPost = currentPage * postsPerPage // variable to get to the last todo
  const indexOfFirstPost = indexOfLastPost - postsPerPage // variable to get to the first todo in the page
  const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost)
  useEffect(() => {
    fetchUsers()
    // eslint-disable-next-line
  }, [])

  // function to fetch the users from json server at localhost:3001/users using axios
  const fetchUsers = async () => {
    setLoading(true)
    const response = await axios.get('http://localhost:3001/users')
    setUsers(response.data)
    setLoading(false)
    console.log(users)
  }

  // fucntion to search for the userName using his id
  const searchName = (id) => {
    id = parseInt(id)
    const user = users.find((user) => user.id === id)
    if (user) {
      return user.name
    }
  }

  // fucntion to search for the userPin using his id
  const searchPin = (id) => {
    id = parseInt(id)
    const user = users.find((user) => user.id === id)
    if (user) {
      return user.pin
    }
  }

  // fucntion to search for the user using his id AND retrieve his todos respectively
  const searchUser = (id) => {
    id = parseInt(id)
    const user = users.find((user) => user.id === id)
    if (user) {
      setTodos(user.todos)
    }
  }

  // function to retrieve the current user
  const getCurrentUser = (id) => {
    id = parseInt(id)
    return users.find((user) => user.id === id)
  }

  // login function
  const login = (id, pin) => {
    id = parseInt(id)
    const user = users.find((user) => user.id === id && user.pin === pin)
    // condition: if user of specific id logged in with the correct pin
    if (user) {
      setLoggedIn(true)
      searchUser(id) // retrieve user's todo list
    } else {
      alert('Incorrect PIN, please try again')
    }
  }

  // Add todos to the list
  const handleSubmit = async (id) => {
    if (editId) {
      const editTodo = todos.find((i) => i.id === editId) // find the 'todo' that we want to edit and assigning it to a variable
      const updatedTodos = todos.map(
        (t) =>
          t.id === editTodo.id // we are searching for the (edited todo)
            ? (t = {id: t.id, todo}) // we are replacing the todo with the new todo
            : {id: t.id, todo: t.todo} // we are keeping the old todo by cloning them
      )

      // axios.patch() function takes 2 parameters
      // 1st: the url to which the request will be made
      // 2nd: the json-data you will be sending to change (id, name, pin, preference, todos)
      setTodos(updatedTodos) // setting our 'updatedTodos' list to the state
      await axios.patch(`http://localhost:3001/users/${id}`, {
        todos: updatedTodos,
      })
      // resesting the input field and the editId
      setEditId(0)
      setTodo('')
      return
    }

    // prevents from adding empty 'todo's, and adds the 'todo' to the list
    if (todo !== '') {
      // we are adding the 'todo' to the list by putting it in an object and spreading all the old todos using '...todos'
      setTodos([{id: `${todo}-${Date.now()}`, todo}, ...todos])
      await axios.patch(`http://localhost:3001/users/${id}`, {
        todos: [{id: `${todo}-${Date.now()}`, todo}, ...todos],
      })
      setTodo('') // resetting the input field
      //date.now(): to make unique id,
      // console.log(`${todo}-${Date.now()}`)
      // item1-1669192232407
      // item1-1669192241445
    }
  }

  // Delete 'todos' from the list
  const handleDelete = async (tid, id) => {
    const delTodo = todos.filter((to) => to.id !== tid)
    setTodos([...delTodo])
    await axios.patch(`http://localhost:3001/users/${id}`, {
      todos: [...delTodo],
    })
    // filter: function applied on array 'todos', when condition (id != fixed tid) is met, filter what we wanna delete
    // we use != id to pass the todos that we wanna keep,
    // and to catch the id=id
    // filter puts the opposite inside of the condition
  }

  // Edit 'todos' from the list
  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id)
    setTodo(editTodo.todo)
    setEditId(id)
  }

  // pagination numbers
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  const changePin = async (id, newPin) => {
    id = parseInt(id)
    // change also the user pin the the state
    const user = users.find((user) => user.id === id)
    if (user) {
      user.pin = newPin
    }
    await axios.patch(`http://localhost:3001/users/${id}`, {
      pin: newPin,
    })
  }

  return (
    <TodosContext.Provider
      value={{
        // states
        todos,
        setTodos,
        todo,
        setTodo,
        editId,
        setEditId,
        currentPage,
        setCurrentPage,
        postsPerPage,
        currentPosts,
        users,
        loggedIn,
        setLoggedIn,
        loading,
        // functions
        handleSubmit,
        handleDelete,
        handleEdit,
        paginate,
        searchUser,
        searchName,
        searchPin,
        login,
        fetchUsers,
        getCurrentUser,
        changePin,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export default TodosContext

// aysnc/await concepts
// web requests need time depending on server, response time
// javascript: single threaded language, can't stop rendering other stuff to take the request
// async: identify that the function is making a web request
// await: specify which statement is the web request
