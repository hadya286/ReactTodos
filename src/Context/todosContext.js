import axios from "axios"
import {createContext, useState} from "react"

const TodosContext = createContext()

export const TodosProvider = ({children}) => {
  // eslint-disable-next-line
  const [users, setUsers] = useState([])

  // set todos for the user
  const [todos, setTodos] = useState([])
  const [loggedIn, setLoggedIn] = useState(false) // this is the state for the login page
  const [todo, setTodo] = useState("") // this is the state for the input field
  const [editId, setEditId] = useState(0) // this is the state for the edit button

  const [currentPage, setCurrentPage] = useState(1) // this is the state for which page we are on
  const [postsPerPage] = useState(5) // this is the state for how many todos we want in each page

  const indexOfLastPost = currentPage * postsPerPage // variable to get to the last todo
  const indexOfFirstPost = indexOfLastPost - postsPerPage // variable to get to the first todo in the page
  const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost)

  // function to fetch the users from json server at localhost:3001/users using axios
  const fetchUsers = async () => {
    const response = await axios.get("http://localhost:3001/users")
    setUsers(response.data)
  }

  const searchName = (id) => {
    id = parseInt(id)
    const user = users.find((user) => user.id === id)
    if (user) {
      return user.name
    }
  }

  // fucntion to search for the user using his id and retrieve his todos respectively
  // fixed is: id, we are searching for user that has this specific id
  const searchUser = (id) => {
    id = parseInt(id)
    const user = users.find((user) => user.id === id)
    if (user) {
      setTodos(user.todos)
    }
  }

  const getCurrentUser = (id) => {
    console.log(id)
    id = parseInt(id)
    return users.find((user) => user.id === id)
  }

  // login function
  const login = (id, pin) => {
    id = parseInt(id)
    pin = parseInt(pin)
    const user = users.find((user) => user.id === id && user.pin === pin)
    if (user) {
      setLoggedIn(true)
      searchUser(id) // retrieve user's todo list
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

      setTodos(updatedTodos) // setting our 'updatedTodos' list to the state
      await axios.patch(`http://localhost:3001/users/${id}`, {
        todos: updatedTodos,
      })
      // resesting the input field and the editId
      setEditId(0)
      setTodo("")
      return
    }

    // prevent from adding empty 'todo's, and add the 'todo' to the list
    if (todo !== "") {
      // we are adding the 'todo' to the list by putting it in an object and spreading all the old todos using '...todos'
      setTodos([{id: `${todo}-${Date.now()}`, todo}, ...todos])
      await axios.patch(`http://localhost:3001/users/${id}`, {
        todos: [{id: `${todo}-${Date.now()}`, todo}, ...todos],
      })
      setTodo("") // resetting the input field
      //date.now(): to make unique id,
      // item1-1669192232407
      // item1-1669192241445
      // console.log(`${todo}-${Date.now()}`)
    }
  }

  // Delete 'todos' from the list
  const handleDelete = async (tid, id) => {
    const delTodo = todos.filter((to) => to.id !== tid)
    setTodos([...delTodo])
    await axios.patch(`http://localhost:3001/users/${id}`, {
      todos: [...delTodo],
    })
    // filter: function applied on array 'todos', when condition (id != fixed id) is met, filter what we wanna delete
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
        // functions
        handleSubmit,
        handleDelete,
        handleEdit,
        paginate,
        searchUser,
        searchName,
        login,
        fetchUsers,
        getCurrentUser,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export default TodosContext
