export default () => ({
  port: process.env.PORT || 3000,
  database: {
    url: process.env.CONNECTION_URL,
  },
  saltRound: 8,
  JWT: {
    JWTsecret: process.env.JWTSECRET,
    JWTExpireTime: process.env.JWT_EXPIRATION_TIME,
  },
  tokenType: process.env.TOKENTYPE,
  google: {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
  },
  nodemailer: {
    host: process.env.HOST,
    email: process.env.EMAIL,
    pass: process.env.PASS,
  },
});
