import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

import useUser from '@/_hooks/user' // this is where the use is from

import CompsLoading from '@/components/Loading'

export default function withPrivateProfileRoute(WrappedComponent) {
  return function PrivateProfileRoute(props) {
    const router = useRouter()
    const { user, isLoading } = useUser()

    useEffect(() => {
      if (!isLoading) {
        if (!user || !user?.Profile) {
          router.push('/')
          toast.info('Please Create Your Own Profile First!', {
            position: 'bottom-left',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
          })
        }
      }
    }, [isLoading, user.Profile])

    if (isLoading || !user.Profile) return <CompsLoading />

    return <WrappedComponent {...props} />
  }
}
