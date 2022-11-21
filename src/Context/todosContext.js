import {createContext, useState} from "react"

const TodosContext = createContext()

export const TodosProvider = ({children}) => {
  const [todos, setTodos] = useState([
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
    {id: 11, todo: "Todo 11", completed: true},
    {id: 12, todo: "Todo 12", completed: false},
    {id: 13, todo: "Todo 13", completed: true},
    {id: 14, todo: "Todo 14", completed: false},
    {id: 15, todo: "Todo 15", completed: true},
    {id: 16, todo: "Todo 16", completed: false},
    {id: 17, todo: "Todo 17", completed: true},
    {id: 18, todo: "Todo 18", completed: false},
    {id: 19, todo: "Todo 19", completed: true},
    {id: 20, todo: "Todo 20", completed: false},
    {id: 21, todo: "Todo 21", completed: true},
    {id: 22, todo: "Todo 22", completed: false},
    {id: 23, todo: "Todo 23", completed: true},
    {id: 24, todo: "Todo 24", completed: false},
    {id: 25, todo: "Todo 25", completed: true},
  ])
  const [loading, setLoading] = useState(false) // this is the state for the loading spinner
  const [todo, setTodo] = useState("") // this is the state for the input field
  const [editId, setEditId] = useState(0) // this is the state for the edit button

  const [currentPage, setCurrentPage] = useState(1) // this is the state for which page we are on
  const [postsPerPage] = useState(5) // this is the state for how many todos we want in each page

  const indexOfLastPost = currentPage * postsPerPage // variable to get to the last todo
  const indexOfFirstPost = indexOfLastPost - postsPerPage // variable to get to the first todo in the page
  const currentPosts = todos.slice(indexOfFirstPost, indexOfLastPost)

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
        // functions
        handleSubmit,
        handleDelete,
        handleEdit,
        paginate,
      }}
    >
      {children}
    </TodosContext.Provider>
  )
}

export default TodosContext
