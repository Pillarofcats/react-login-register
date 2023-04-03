function deleteSessionCookie () {
  document.cookie = "sessionID=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.railway.app;"
}

export default deleteSessionCookie