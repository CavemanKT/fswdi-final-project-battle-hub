import { ironSession } from 'next-iron-session'

export default ironSession({
  password: process.env.SECRET_COOKIE_PASSWORD,
  cookieName: 'session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production'
  }
})
