import React, {useContext} from 'react'

import DiaryEntry from './DiaryEntry'

function Diary({diary}) {

  return (
    <div className='diary'>
      <h2>Diary</h2> 
      {
        diary.userDiary.map((entry, index) => (
          <DiaryEntry entry={entry} index={index} key={index}/>
        ))
      }
    </div>
  )
}

export default Diary