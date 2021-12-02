import React from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/Modal'

import FormsAuthLogin from '@/components/forms/auth/login-inspector'

const PageLogin = () => {
  const handleInspectorLoginSubmit = () => {

  }
  return (

    <FormsAuthLogin
      onSubmit={handleInspectorLoginSubmit}
    />

  )
}
PageLogin.propTypes = {

}

export default PageLogin
