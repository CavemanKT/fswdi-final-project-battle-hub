import useUser from '@/_hooks/user'

import CompsLayout from '@/components/layouts/Layout'
import withPrivateRoute from '@/_hocs/withPrivateRoute'   // just use this component if you need authentication before loading the page

function PagesPrivate() {
  const { user } = useUser()

  return (
    <CompsLayout>
      <div id="pages-private">
        <h1>Private Page</h1>
        <h2>{user.email}</h2>
      </div>
    </CompsLayout>
  )
}

export default withPrivateRoute(PagesPrivate)
