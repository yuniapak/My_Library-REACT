import Client from './api'

export const signIn = async (data) => {
  try {
    const res = await Client.post('/api/auth/login', data)
    console.log('token from log in', res.data.token)
    localStorage.setItem('token', res.data.token)
    return res.data.user
  } catch (error) {
    throw error
  }
}

export const CheckSession = async () => {
  try {
    const res = await Client.get('/api/auth/session')
    console.log('session is on', res.data)
    return res.data
  } catch (error) {
    throw error
  }
}

export const RegisterUser = async (data) => {
  try {
    const res = await Client.post('/api/auth/register', data)
    console.log(res.data)
    return res.data
  } catch (error) {
    throw error
  }
}
