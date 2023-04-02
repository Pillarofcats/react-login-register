import React from 'react'

function DiaryForm() {

  function submitDiaryEntry(e) {
    e.preventDefault()
    console.log('submitted diary entry')
  }

  return (
    <div className='diary-form'>
      <form onSubmit={submitDiaryEntry}>
        <label htmlFor="diary-title"></label>
        <input required type="text" id='diary-title' />
        <label htmlFor="diary-text"></label>
        <textarea required placeholder='Write your message here..' name="diary-text" id="diary-text" cols="30" rows="10"></textarea>
        <button className="btn btn-primary" type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default DiaryForm