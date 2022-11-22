import {createContext, useState} from "react"

const TodosContext = createContext()

export const TodosProvider = ({children}) => {
  // eslint-disable-next-line
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      pin: 1234,
      todos: [
        {id: 1, todo: "Todo 1", completed: true},
        {id: 2, todo: "Todo 2", completed: false},
        {id: 3, todo: "Todo 3", completed: true},
        {id: 4, todo: "Todo 4", completed: false},
        {id: 5, todo: "Todo 5", completed: true},
        {id: 6, todo: "Todo 6", completed: false},
        {id: 7, todo: "Todo 7", completed: true},
        {id: 8, todo: "Todo 8", completed: false},
        {id: 9, todo: "Todo 9", completed: true},
        {id: 10, todo: "Todo 10", completed: false},
      ],
    },
    {
      id: 2,
      name: "Jenny Walberg",
      pin: 1234,
      todos: [
        {id: 1, todo: "Todo 1", completed: true},
        {id: 2, todo: "Todo 2", completed: false},
        {id: 3, todo: "Todo 3", completed: true},
        {id: 4, todo: "Todo 4", completed: false},
        {id: 5, todo: "Todo 5", completed: true},
        {id: 6, todo: "Todo 6", completed: false},
        {id: 7, todo: "Todo 7", completed: true},
        {id: 8, todo: "Todo 8", completed: false},
        {id: 9, todo: "Todo 9", completed: true},
        {id: 10, todo: "Todo 10", completed: false},
      ],
    },
    {
      id: 3,
      name: "Billy Cage",
      pin: 1234,
      todos: [
        {id: 1, todo: "Todo 1", completed: true},
        {id: 2, todo: "Todo 2", completed: false},
        {id: 3, todo: "Todo 3", completed: true},
        {id: 4, todo: "Todo 4", completed: false},
        {id: 5, todo: "Todo 5", completed: true},
        {id: 6, todo: "Todo 6", completed: false},
        {id: 7, todo: "Todo 7", completed: true},
        {id: 8, todo: "Todo 8", completed: false},
        {id: 9, todo: "Todo 9", completed: true},
        {id: 10, todo: "Todo 10", completed: false},
      ],
    },
  ])

  // set todos for the user
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(false) // this is the state for the loading spinner
  const [loggedIn, setLoggedIn] = useState(false) // this is the state for the login page
  const [todo, setTodo] = useState("") // this is the state for the input field
  const [editId, setEditId] = useState(0) // this is the state for the edit button

  const [currentPage, setCurrentPage] = useState(1) // this is the state for which page we are on
  const [postsPerPage] = useState(5) // this is the state for how many todos we want in each page

  const indexOfLastPost = currentPage * postsPerPage // variable to get to the last todo
  const indexOfFirstPost = indexOfLastPost - postsPerPage // variable to get to the first todo in the page
  const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost)

  const searchName = (id) => {
    id = parseInt(id)
    const user = users.find((user) => user.id === id)
    if (user) {
      return user.name
    }
  }

  // fucntion to search for the user using his id
  // fixed is: id, we are searching for user that has this specific id
  const searchUser = (id) => {
    id = parseInt(id)
    const user = users.find((user) => user.id === id)
    if (user) {
      setTodos(user.todos)
    }
  }

  // login function
  const login = (id, pin) => {
    id = parseInt(id)
    pin = parseInt(pin)
    const user = users.find((user) => user.id === id && user.pin === pin)
    if (user) {
      setLoggedIn(true)
      searchUser(id)
    }
  }

  // Add todos to the list
  const handleSubmit = (e) => {
    e.preventDefault()

    if (editId) {
      const editTodo = todos.find((i) => i.id === editId) // find the 'todo' that we want to edit and assigning it to a variable
      const updatedTodos = todos.map(
        (t) =>
          t.id === editTodo.id // we are searching for the (edited todo)
            ? (t = {id: t.id, todo}) // we are replacing the todo with the new todo
            : {id: t.id, todo: t.todo} // we are keeping the old todo by cloning them
      )
      setTodos(updatedTodos) // setting our updated 'todos' list to the state
      // resesting the input field and the editId
      setEditId(0)
      setTodo("")
      return
    }

    // prevent from adding empty 'todo's and adding the 'todo' to the list
    if (todo !== "") {
      // we are adding the 'todo' to the list by putting it in an object and spreading all the old todos using '...todos'
      setTodos([{id: `${todo}-${Date.now()}`, todo}, ...todos])
      setTodo("") // resetting the input field
    }
  }

  // Delete 'todos' from the list
  const handleDelete = (id) => {
    const delTodo = todos.filter((to) => to.id !== id)
    setTodos([...delTodo])
  }

  // Edit 'todos' from the list
  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id)
    setTodo(editTodo.todo)
    setEditId(id)
  }

  //
  const paginate = (pageNumber) => setCurrentPage(pageNumber)

  return (
    <TodosContext.Provider
      value={{
        // states
        todos,
        setTodos,
        loading,
        setLoading,
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
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export default TodosContext
