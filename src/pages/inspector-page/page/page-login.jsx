import React from 'react'
import PropTypes from 'prop-types'

import { useRouter } from 'next/router'
import FormsAuthLogin from '@/components/forms/auth/login-inspector'
import useUser from '@/_hooks/user'

const PageLogin = () => {
  const router = useRouter()
  const { user, isLoading,
    apiSignup, apiLogin, apiInspectorLogin, apiLogout } = useUser()

  const handleInspectorLoginSubmit = (values) => {
    apiInspectorLogin(values).then(() => {
      router.push('/inspector-page/page/page-dashboard')
    })
  }
  return (
    <div className="container mt-5 inspector-login-container">

      <div className="inspector-login-logo" />
      <FormsAuthLogin
        onSubmit={handleInspectorLoginSubmit}
      />
    </div>

  )
}
PageLogin.propTypes = {

}

export default PageLogin
