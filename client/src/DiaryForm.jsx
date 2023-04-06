import React, {useRef, useContext} from 'react'
import {StoreContext} from './StoreContextProvider'

function DiaryForm() {

  const {user, diary} = useContext(StoreContext)

  const titleRef = useRef()
  const textRef = useRef()

  function submitDiaryEntry(e) {
    e.preventDefault()

    getDiary()
      .then((res) => {
        //If user response has .errMessage property set error message
        if(res?.errMessage) {
          setServerMessage(["text-danger", res?.errMessage])
          setIsMessage(true)
        }
        if(res) {
          console.log('server res', res)
          diary.setUserDiary(res.entries)
          // diary.setUserDiary(diary => [...diary, res.entries])
        }
      })
      .catch((err) => console.log(err))
  }

  async function getDiary() {

    const entry = {title: titleRef?.current.value, date: new Date().toLocaleDateString(), text: textRef?.current.value}

    const postData = {
      id: user.user.id,
      uDiary: [...diary.userDiary, entry]
    }

    console.log('diary post data', postData)

    const URL = "https://classy-steel-production.up.railway.app/diaryEntry"

    try {
      const response = await fetch(URL, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        credentials: "include",
        body: JSON.stringify(postData)
      })

      return await response.json()
    } catch(err) {
      console.error(err)
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