import Link from 'next/link'

export default function CompsLayoutsFooter() {
  return (
    <footer id="footer">
      {/* <div className="croped">
        <div className="animate-logo" />
      </div> */}
      <div className="container">
        <div className="row">
          <div className="col-md-4 footer-column">
            <ul className="nav flex-column text-center">
              <li className="nav-item">
                <span className="footer-title">Product</span>
              </li>
              <li className="nav-item">
                <a className="nav-link app-store-button" href="#" />
              </li>
              <li className="nav-item">
                <a className="nav-link google-play-button" href="#" />
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Frequently asked questions</a>
              </li>
            </ul>
          </div>
          <div className="col-md-4 footer-column">
            <ul className="nav flex-column text-center">
              <li className="nav-item">
                <span className="footer-title">Company</span>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">About us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">Job postings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">News and articles</a>
              </li>
              <li className="nav-item">
                <Link href="/inspector-page/page/page-login">
                  <a className="nav-link">Inspector</a>
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-md-4 footer-column">
            <ul className="nav flex-column text-center">
              <li className="nav-item">
                <span className="footer-title">Contact & Support</span>
              </li>
              <li className="nav-item">
                <span className="nav-link"><i className="fas fa-phone" />+852 0000 0000</span>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fas fa-comments" />Live chat</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fas fa-envelope" />Contact us</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#"><i className="fas fa-star" />Give feedback</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center"><i className="fas fa-ellipsis-h" /></div>

        <div className="row text-center">
          <div className="col-md-4 box">
            <span className="copyright quick-links">Copyright &copy; Battle Hub {new Date().getFullYear()}
            </span>
          </div>
          <div className="col-md-4 box">
            <ul className="list-inline social-buttons">
              <li className="list-inline-item">
                <a href="#" className="fab fa-twitter" />
              </li>
              <li className="list-inline-item">
                <a href="#" className="fab fa-facebook-f" />
              </li>
              <li className="list-inline-item">
                <a href="#" className="fab fa-linkedin-in" />
              </li>
            </ul>
          </div>
          <div className="col-md-4 box">
            <ul className="list-inline quick-links">
              <li className="list-inline-item">
                <a href="#">Privacy Policy</a>
              </li>
              <li className="list-inline-item">
                <a href="#">Terms of Use</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>

  )
}
