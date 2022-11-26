const sessionOptions = {
  genid: function(req) {
    return genuuid()
  },
  secret: process.env.SESSION_SECRET,
  path: '/login',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 60000,  }
}

module.exports = sessionOptions