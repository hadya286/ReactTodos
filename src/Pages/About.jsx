import {useContext, useState} from 'react'
import {BiArrowBack} from 'react-icons/bi'
import {Link, useParams} from 'react-router-dom'
import ThemeSwitch from '../Components/ThemeSwitch'
import ThemeContext from '../Context/themeContext'
import TodosContext from '../Context/todosContext'

const About = () => {
  const [state1, setState1] = useState('')
  const [state2, setState2] = useState('')
  const [isError, setIsError] = useState('')
  const [isValid, setIsValid] = useState(false)
  const {lang} = useContext(ThemeContext)
  const {searchName, searchPin, changePin} = useContext(TodosContext)
  const {id} = useParams()

  const checkValidation = () => {
    // let regx = new RegExp('^(?!(.)\1+$)d{4}$')

    let regx = /^(?!(.)\1+$)\d{4}$/

    if (state1 === state2 && regx.test(state2)) {
      setIsError('PIN Changed')
      return true
    } else if (!regx.test(state2) && state2 !== '' && state1 === state2) {
      setIsError('PIN should be 4 non-similar digits')
      return false
    } else if (state1 !== state2) {
      setIsError('Confirm PIN should match New PIN')
      return false
    } else {
      setIsError('')
    }
  }

  return (
    <div className='card'>
      <h2 className='card-header' style={{display: 'flex'}}>
        <Link to={`/users/${id}`}>
          <BiArrowBack className='arrowIcon' size={35} />
        </Link>
        {lang === 'en' ? `About ${searchName(id)}` : `${searchName(id)} عن`}
      </h2>
      <div>
        <h4 className='card-header' style={{alignItems: 'right'}}>
          {lang === 'en'
            ? `Old Pin: ${searchPin(id)}`
            : `${searchPin(id)} :كلمة المرور السابقة`}
        </h4>
      </div>

      <form
        className='pinForm'
        onSubmit={(e) => {
          e.preventDefault()
          if (checkValidation()) {
            changePin(id, state2)
            setState2('')
            setState1('')
          }
          // a timeout to show the error message, after the time is finished the error message will be removed
          setTimeout(() => {
            setIsError('')
          }, 3000) // time is milliseconds
        }}
      >
        <input
          className='todo'
          type='password'
          value={state1}
          id='myInput1'
          placeholder={lang === 'ar' ? '..كلمة مرور جديدة' : 'New PIN..'}
          onChange={(e) => setState1(e.target.value)}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
        />
        <input
          className='todo'
          type='password'
          value={state2}
          id='myInput2'
          placeholder={
            lang === 'ar' ? '..تأكيد كلمة المرور' : 'Confirm New PIN..'
          }
          onChange={(e) => setState2(e.target.value)}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
          style={{marginTop: '15px'}}
        />
        <button className='btn' type='submit' style={{marginTop: '20px'}}>
          {lang === 'ar' ? 'تغيير كلمة المرور' : 'Change PIN'}
        </button>
      </form>

      <div className='error'>{isError}</div>

      <div>
        <button
          className='btn btn3'
          type='submit'
          onClick={() => {
            changePin(id, '')
            alert('PIN deleted')
          }}
        >
          {lang === 'ar' ? 'الغاء كلمة المرور' : 'Delete PIN'}
        </button>
      </div>

      <div style={{marginTop: '40px'}}>
        <ThemeSwitch />
      </div>
    </div>
  )
}

export default About
