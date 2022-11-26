const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  path: '/login',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true, httpOnly: false, maxAge: 60000  }
}

module.exports = sessionOptions