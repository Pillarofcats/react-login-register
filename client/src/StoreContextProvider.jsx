import React, {useState, createContext} from 'react'

import initUser from './initialData/initUser'

export const StoreContext = createContext(null)

function StoreContextProvider({children}) {

  const [user, setUser] = useState(() => initUser)
  const [userDiary, setUserDiary] = useState([])

  const store = {
    user: {user, setUser},
    diary: {userDiary, setUserDiary}
  }

  return (
    <>
      <StoreContext.Provider value={store}>
        {children}
      </StoreContext.Provider>
    </>
  )
}

export default StoreContextProvider