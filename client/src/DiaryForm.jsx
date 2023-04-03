import React, {useRef, useContext} from 'react'
import {StoreContext} from './StoreContextProvider'

function DiaryForm() {

  const {setUserDiary} = useContext(StoreContext)

  const titleRef = useRef()
  const textRef = useRef()

  function submitDiaryEntry(e) {
    e.preventDefault()

    const entry = {title: titleRef?.current.value, date: new Date().toLocaleDateString(), text: textRef?.current.value}

    if(entry.title && entry.text) {
      setUserDiary(diary =>  [...diary, entry])
    }
  }

  return (
    <div className='diary-form'>
      <h2>Diary Entry</h2>
      <form onSubmit={submitDiaryEntry}>
        <label htmlFor="diary-title"><b>Title</b></label>
        <input required ref={titleRef} type="text" id='diary-title' />
        <label htmlFor="diary-text"><b>Entry</b></label>
        <textarea required ref={textRef} placeholder='Write your message here..' spellCheck="true" name="diary-text" id="diary-text"></textarea>
        <button className="btn btn-primary" type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default DiaryForm