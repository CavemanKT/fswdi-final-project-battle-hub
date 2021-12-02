import useUser from '@/_hooks/user'

import CompsLayout from '@/components/layouts/Layout'

// just use this component if you need authentication before loading the page
import withPrivateRoute from '@/_hocs/withPrivateRoute'

function PagesPrivate() {
  const { user } = useUser()

  if (!user) return null

  return (
    <CompsLayout>
      <div id="pages-private" className="d-flex container justify-content-center ">
        <div className="d-block m-5">
          <h1 className="mt-5">User Information</h1>
          <h3>Email: {user.email}</h3>
          <h3>Account type: {user.type}</h3>
          <h3>
            Battle Journey starts from: {user.createdAt.split('').splice(0, 10)}
          </h3>
        </div>
      </div>
    </CompsLayout>
  )
}

export default withPrivateRoute(PagesPrivate)
