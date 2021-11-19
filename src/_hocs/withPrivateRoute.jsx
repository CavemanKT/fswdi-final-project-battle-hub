import { useEffect } from 'react'
import { useRouter } from 'next/router'

import useUser from '@/_hooks/user'

import CompsLoading from '@/components/Loading'

export default function withPrivateRoute(WrappedComponent) {
  return function PrivateRoute(props) {
    const router = useRouter()
    const { user, isLoading } = useUser()

    useEffect(() => {
      if (!isLoading && !user) router.push('/')
    }, [isLoading])

    if (isLoading || !user) return <CompsLoading />

    return <WrappedComponent {...props} />
  }
}
