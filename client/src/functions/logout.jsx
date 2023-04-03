import deleteSessionCookie from './deleteSessionCookie'
import initUser from '../initialData/initUser'

function logout(user) {
  //Delete Cookie
  deleteSessionCookie()
  //Delete local storage item 'rll_uid'
  localStorage.removeItem('rrl_uid')
  //Set user
  user.setUser(initUser)
}

export default logout