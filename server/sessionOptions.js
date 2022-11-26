const sessionOptions = {
  secret: process.env.SESSION_SECRET,
  path: '/login',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60000,  }
}

module.exports = sessionOptions