import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import FormsAuthLogin from '@/components/forms/auth/login-inspector'
import useUser from '@/_hooks/user'

const PageLogin = () => {
  const router = useRouter()
  const { apiInspectorLogin } = useUser()

  const handleInspectorLoginSubmit = (values) => {
    apiInspectorLogin(values).then(() => {
      router.push('/inspector-page/page/page-dashboard')
    })
  }
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
        <title>Battle Hub</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.png" />
      </Head>

      <div className="container mt-5 inspector-login-container align-items-center">
        <Link href="/">
          <a className="inspector-login-logo" />
        </Link>
        <FormsAuthLogin
          onSubmit={handleInspectorLoginSubmit}
        />
      </div>
    </>
  )
}

export default PageLogin
