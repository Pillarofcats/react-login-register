const corsOptions = {
  //Access-Control-Allow-Origin
  origin: 'https://react-register-login-production.up.railway.app/*',
  //Access-Control-Allow-Methods
  methods: ['GET','POST','HEAD'],
  //Access-Control-Allow-Credentials
  credentials: true
}

module.exports = corsOptions