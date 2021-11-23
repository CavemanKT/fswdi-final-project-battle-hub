import axios from 'axios'

export default function useApiAuth() {
  const apiSignup = (values) =>(new Promise((resolve, reject)=> {
    console.log(values);
    axios({
      method:'POST',
      url: '/api/auth/email/signup',
      data: values,
    }).then((resp) => {
      resolve(resp)
    }).catch((err) => {
      reject(err)
    })
  }))

  const apiLogin = (values) => (new Promise((resolve, reject) => {
    console.log(values);
    axios({
      method:'POST',
      url: '/api/auth/email/login',
      data:values,
      withCredentials:true
    }).then((resp) => {
      resolve(resp)
    }).catch((err) => {
      reject(err)
    })
  }))

  const apiLogout = () => (new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
      url: `/api/auth/logout`,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
    }).catch((err) => {
      reject(err)
    })
  }))

  return {
    apiSignup,
    apiLogin,
    apiLogout
  }
}
