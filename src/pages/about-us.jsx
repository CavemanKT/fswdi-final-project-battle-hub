import CompsLayout from '@/components/layouts/Layout'

// just use this component if you need authentication before loading the page

function PagesPrivate() {
  return (
    <CompsLayout>
      <div id="pages-about-us" className="d-block container justify-content-center">
        <h1 className="mt-5 ms-4 me-3 mb-3">
          About us
        </h1>
        <h4 className="ms-4 me-3 mb-5">
          We are PVP facilitator of the virtual world, we aim at enhancing human kind&#39;s skills in terms of strategy, instinct response and quick learning.
        </h4>

        <h1 className="mt-5 ms-4 me-3 mb-3">
          Philosophy
        </h1>
        <h4 className="ms-4 me-3 mb-5">
          Aim at Perfection, try harder
        </h4>
      </div>

    </CompsLayout>
  )
}

export default PagesPrivate
