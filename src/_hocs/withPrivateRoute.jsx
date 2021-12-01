import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import useUser from '@/_hooks/user' // this is where the use is from

import CompsLoading from '@/components/Loading'

export default function withPrivateRoute(WrappedComponent) {
  return function PrivateRoute(props) {
    const router = useRouter()
    const { user, isLoading } = useUser()

    useEffect(() => {
      if (!isLoading && !user) {
        router.push('/')
        toast.warning('Please Login First!', {
          position: 'bottom-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined
        })
      }
    }, [isLoading, user])

    if (isLoading || !user) return <CompsLoading />

    return <WrappedComponent {...props} />
  }
}
