const cookieSessionOptions = {
  domain: '.railway.app',
  maxAge: 5*86400000,
  secure: true,
  httpOnly: false,
  sameSite: 'strict',
  expires: new Date(Date.now() + 5 * 86400000)
}

module.exports = cookieSessionOptions