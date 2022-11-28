function getSessionCookie () {
  const cPattern = new RegExp('sessionID=.[^;]*')
  const cMatch = document.cookie.match(cPattern)
  if(cMatch) {
    const cData = cookieMatch[0].split('=')
    return cData[1]
  }
  return false
}

export default getSessionCookie