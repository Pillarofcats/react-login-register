import React, {useContext} from 'react'
import { StoreContext } from '../StoreContextProvider'

import Welcome from '../Welcome'
import DiaryForm from '../DiaryForm'
import Diary from '../Diary'

//Page component route
function Home() {

  const {user, diary} = useContext(StoreContext)

  //Render
  return (
    <>
    {
      user.user.id ? (
        <div className="center-page">
          <Welcome />
          <DiaryForm />
          <Diary diary={diary}/>
        </div>  
      ) : (
      <h1 className="center-page">Welcome Stranger!</h1>
      )
    }
    </>
  )
}

export default Home