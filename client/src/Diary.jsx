import React, {useContext} from 'react'

import DiaryEntry from './DiaryEntry'
import { StoreContext } from './StoreContextProvider'

function Diary() {

  const {diary} = useContext(StoreContext)
  
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