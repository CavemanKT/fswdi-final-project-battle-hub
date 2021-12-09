import useSWR from 'swr'
import axios from 'axios'

import fetcher from '@/_services/fetcher'
import getFormData from '@/_services/getFormData'

export default function useUser() {
  const { data, error, mutate } = useSWR('/api/my/profile', fetcher, {
    shouldRetryOnError: false
  })

  const apiSignup = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: '/api/auth/email/signup',
      data: values,
      withCredentials: true
    }).then((resp) => {
      mutate(resp.data)
      resolve(resp)
    }).catch((err) => {
      reject(err)
    })
  }))

  const apiLogin = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: '/api/auth/email/login',
      data: values,
      withCredentials: true
    }).then((resp) => {
      mutate(resp.data)
      resolve(resp)
    }).catch((err) => {
      reject(err)
    })
  }))

  const apiInspectorLogin = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: '/api/auth/email/login-inspector',
      data: values,
      withCredentials: true
    }).then((resp) => {
      mutate(resp.data)
      resolve(resp)
    }).catch((err) => {
      reject(err)
    })
  }))

  const apiLogout = () => (new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
      url: '/api/auth/logout',
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      mutate(null)
    }).catch((err) => {
      reject(err)
    })
  }))

  const apiProfileCreate = (values) => (new Promise((resolve, reject) => {
    axios({
      method: 'POST',
      url: '/api/profile/create',
      data: getFormData(values, 'profile'),
      withCredentials: true
    }).then((resp) => {
      if (data?.user) {
        console.log(resp)
        mutate(resp.data)
      }
      resolve(resp)
    }).catch((err) => {
      reject(err)
    })
  }))

  const apiProfileDestroy = (profileId) => (new Promise((resolve, reject) => {
    axios({
      method: 'DELETE',
      url: `/api/profile/delete/${profileId}`,
      withCredentials: true
    }).then((resp) => {
      resolve(resp)
      console.log(resp)
      if (data?.user) {
        mutate(resp.data)
      }
    }).catch((err) => {
      reject(err)
    })
  }))

  return {
    user: data?.user || null,
    isLoading: !error && !data,
    isError: error,
    errorMessage: error?.response?.data?.message,
    apiSignup,
    apiLogin,
    apiInspectorLogin,
    apiLogout,
    apiProfileCreate,
    apiProfileDestroy
  }
}
