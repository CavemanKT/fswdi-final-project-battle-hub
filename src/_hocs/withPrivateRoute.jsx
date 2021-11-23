import { useEffect } from 'react'
import { useRouter } from 'next/router'

import useUser from '@/_hooks/user' // this is where the use is from

import CompsLoading from '@/components/Loading'

export default function withPrivateRoute(WrappedComponent) {
  return function PrivateRoute(props) {
    const router = useRouter()
    const { user, isLoading } = useUser()

    useEffect(() => {
      if (!isLoading && !user) router.push('/')
    }, [isLoading, user])

    if (isLoading || !user) return <CompsLoading />

    return <WrappedComponent {...props} />
  }
}
