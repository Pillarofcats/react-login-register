// import React, {useContext} from 'react'
// import { StoreContext } from "../StoreContextProvider"

import deleteSessionCookie from './deleteSessionCookie'
import initUser from '../initialData/initUser'

function logout(user) {
  // const {user} = useContext(StoreContext)
  //Delete Cookie
  deleteSessionCookie()
  //Delete local storage item 'rll_uid'
  localStorage.removeItem('rrl_uid')
  //Set user
  user.setUser(initUser)
}

export default logout