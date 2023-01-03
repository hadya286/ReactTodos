import React, {useContext} from 'react'
import TodosContext from '../Context/todosContext'
import ThemeContext from '../Context/themeContext'
import {useParams} from 'react-router-dom'
import {useState} from 'react'
import Draggable from 'react-draggable'
import {useEffect} from 'react'

const Posts = () => {
  const {lang} = useContext(ThemeContext)
  const {handleDelete, handleEdit, currentPosts, setCurrentPosts} =
    useContext(TodosContext)
  const {id} = useParams()

  const [pos, setPos] = useState({x: 0, y: 0})

  const [diffY, setDiffY] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [styles, setStyles] = useState({})

  const trackPos = (data) => {
    setPos({x: data.x, y: data.y})
  }

  const dragStart = (e) => {
    setDiffY(e.screenY - e.currentTarget.getBoundingClientRect().top)
    setDragging(true)
  }

  const drag = (e) => {
    var top = e.screenY - diffY
    setStyles({
      top: top,
    })
  }

  const dragEnd = (e) => {
    setDragging(false)
  }

  // Calculate the new index for the dragged item based on its position
  const newIndex = Math.round(pos.y / 50)

  // this is causing an infinite loop
  //
  // // Update the order of the items in the currentPosts array
  // setCurrentPosts(
  //   currentPosts.map((item, index) => {
  //     if (index === newIndex) {
  //       return item
  //     } else {
  //       return currentPosts[newIndex]
  //     }
  //   })
  // )

  const [prevPosts, setPrevPosts] = useState(null)

  useEffect(() => {
    setPrevPosts(currentPosts)
  }, [currentPosts])
  console.log('prevPosts: ', prevPosts)

  useEffect(() => {
    function updatePosts() {
      setCurrentPosts(() => {
        // Update the order of the items in the prevPosts array
        return prevPosts.map((item, index) => {
          if (index === newIndex) {
            return item
          } else {
            return prevPosts[newIndex]
          }
        })
      })
    }

    if (dragging) {
      updatePosts()
    }
  }, [prevPosts, dragging, newIndex, setCurrentPosts])
  console.log('currentPosts: ', currentPosts)

  return (
    <ul className='bound'>
      {currentPosts.map((t, index) => (
        <Draggable axis='y' onDrag={(e, data) => trackPos(data)}>
          <div
            className='singleTodo'
            style={styles}
            key={t.id}
            onMouseDown={dragStart}
            onMouseMove={dragging ? drag : null}
            onMouseUp={dragEnd}
          >
            <span className='todoText'>
              (y: {pos.y}) {t.todo}
            </span>
            <button className='btn2' onClick={() => handleEdit(t.id)}>
              {lang === 'ar' ? 'تعديل' : 'Edit'}
            </button>
            <button className='btn2' onClick={() => handleDelete(t.id, id)}>
              {lang === 'ar' ? 'إزالة' : 'Remove'}
            </button>
          </div>
        </Draggable>
      ))}
    </ul>
  )
}

export default Posts
