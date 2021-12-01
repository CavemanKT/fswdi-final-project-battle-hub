import Head from 'next/head'
import CompsLayoutsNavbar from '@/components/layouts/Navbar'
import CompsLayoutsFooter from '@/components/layouts/Footer'

export default function CompLayout({ children }) {
  return (
    <>
      <Head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" integrity="sha512-Fo3rlrZj/k7ujTnHg4CGR2D7kSs0v4LLanw2qksYuRlEzO+tcaEPQogQ0KaoGN26/zrn20ImR1DfuLWnOo7aBA==" crossOrigin="anonymous" referrerpolicy="no-referrer" />
        <title>Battle Hub</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.png" />
      </Head>

      <div id="comps-layout">
        <CompsLayoutsNavbar />
        {children}
        <CompsLayoutsFooter />
      </div>
    </>
  )
}
