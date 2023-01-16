import {useRef, useEffect} from 'react'
import clamp from 'lodash-es/clamp'
import swap from 'lodash-move'
import {useDrag} from 'react-use-gesture'
import {useSprings, animated} from 'react-spring'

import React, {useContext} from 'react'
import TodosContext from '../Context/todosContext'
import ThemeContext from '../Context/themeContext'
import {useParams} from 'react-router-dom'

// Returns fitting styles for dragged/idle items
const fn = (order, active, originalIndex, curIndex, y) => (index) =>
  active && index === originalIndex
    ? {
        y: curIndex * 100 + y,
        scale: 1.1,
        zIndex: '1',
        shadow: 15,
        immediate: (n) => n === 'y' || n === 'zIndex',
      }
    : {
        y: order.indexOf(index) * 100,
        scale: 1,
        zIndex: '0',
        shadow: 1,
        immediate: false,
      }

function DraggableList() {
  const {lang} = useContext(ThemeContext)
  const {handleDelete, handleEdit, currentPosts} = useContext(TodosContext)
  const {id} = useParams()

  const order = useRef(currentPosts.map((_, index) => index)) // Store indicies as a local ref, this represents the item order
  const [springs, setSprings] = useSprings(
    currentPosts.length,
    fn(order.current)
  ) // Create springs, each corresponds to an item, controlling its transform, scale, etc.

  useEffect(() => {
    order.current = currentPosts.map((_, index) => index)
    setSprings(fn(order.current))
  }, [currentPosts, setSprings])

  const bind = useDrag(({args: [originalIndex], active, movement: [, y]}) => {
    const curIndex = order.current.indexOf(originalIndex)
    const curRow = clamp(
      Math.round((curIndex * 100 + y) / 100),
      0,
      currentPosts.length - 1
    )
    const newOrder = swap(order.current, curIndex, curRow)
    setSprings(fn(newOrder, active, originalIndex, curIndex, y)) // Feed springs new style data, they'll animate the view without causing a single render
    if (!active) {
      order.current = newOrder
    }
  })

  return (
    <ul
      className='content'
      style={{height: currentPosts.length * 100, position: 'relative'}}
    >
      {springs.map(({zIndex, shadow, y, scale}, i) => (
        <animated.div
          className='singleTodo'
          {...bind(i)}
          key={i}
          style={{
            zIndex,
            boxShadow: shadow.to(
              (s) => `rgba(0, 0, 0, 0.15) 0px ${s}px ${2 * s}px 0px`
            ),
            y,
            scale,
          }}
          children={currentPosts[i]}
        >
          <span className='todoText'>
            {currentPosts[i].todo} (id: {currentPosts[i].id}){' '}
          </span>

          <button
            className='btn2'
            onClick={() => {
              handleEdit(currentPosts[i].id)
            }}
          >
            {lang === 'ar' ? 'تعديل' : 'Edit'}
          </button>
          <button
            className='btn2'
            onClick={() => {
              handleDelete(currentPosts[i].id, id)
            }}
          >
            {lang === 'ar' ? 'إزالة' : 'Remove'}
          </button>
        </animated.div>
      ))}
    </ul>
  )
}
export default DraggableList

// {
//   currentPosts.map((t) => (
//     <animated.li
//       // allows the animation to update the position of the list item based on the drag events and the corresponding value in the yArray array
//       style={{y: y.to((yArray) => yArray[t.id])}}
//       {...bindDrag(t.id)}
//       className='singleTodo'
//       key={t.id}
//     >
//       {console.log('yArray: ', yArray)}
//       <span className='todoText'>
//         {t.todo} (id: {t.id})
//       </span>

//       <button
//         className='btn2'
//         onClick={() => {
//           handleEdit(t.id)
//         }}
//       >
//         {lang === 'ar' ? 'تعديل' : 'Edit'}
//       </button>
//       <button
//         className='btn2'
//         onClick={() => {
//           handleDelete(t.id, id)
//         }}
//       >
//         {lang === 'ar' ? 'إزالة' : 'Remove'}
//       </button>
//     </animated.li>
//   ))
// }

//   return (
//     <ul>
//       {currentPosts.map((t) => (
//         <li className='singleTodo' key={t.id}>
//           <span className='todoText'>{t.todo}</span>
//           <button className='btn2' onClick={() => handleEdit(t.id)}>
//             {lang === 'ar' ? 'تعديل' : 'Edit'}
//           </button>
//           <button className='btn2' onClick={() => handleDelete(t.id, id)}>
//             {lang === 'ar' ? 'إزالة' : 'Remove'}
//           </button>
//         </li>
//       ))}
//     </ul>
//   )
// }
