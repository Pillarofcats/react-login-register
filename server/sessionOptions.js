const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  path: '/login',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true, maxAge: 60000, sameSite: 'none'  }
}

module.exports = sessionOptions