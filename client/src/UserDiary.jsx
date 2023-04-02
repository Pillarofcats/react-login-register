import React from 'react'

import DiaryEntry from './DiaryEntry'

function UserDiary({userDiary}) {

  return (
    <div className='user-diary'> 
      {
        userDiary.map((entry, index) => {
          <DiaryEntry entry={entry} key={index} />
        })
      }
    </div>
  )
}

export default UserDiary