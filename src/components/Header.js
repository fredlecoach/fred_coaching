import { Link, useLocation } from "react-router-dom";
import logo from "../styles/images/logo_orange.png";

export default function Header({ nbreArticlePanier, prixTotalPanier }) {
  const location = useLocation(); // Récupère l'URL actuelle

  return (
    <header className="navbar navbar-expand-lg bg-dark" style={{ marginBottom: "100px" }}>
      <nav className="container-fluid">
        {/* Logo */}
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Logo Fred le Coach"
            className="d-inline-block align-text-top"
            style={{ height: "280px" }}
          />
        </Link>

        {/* Navigation Links */}
        <ul className="navbar-nav ms-auto d-flex">
          <li className="nav-item">
            <Link
              to="/"
              className={`nav-link text-white ${location.pathname === '/' ? 'active' : ''}`} // Classe active
            >
              Home
            </Link>
          </li>

          {/* Coachings */}
          <li className="nav-item dropdown">
            <button
              className={`nav-link dropdown-toggle text-white btn btn-link ${location.pathname.includes('/e-coaching') || location.pathname.includes('/personal_training') ? 'active' : ''}`}
              id="coachingsDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Coachings <i className="fa-solid fa-dumbbell"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="coachingsDropdown">
              <li>
                <Link
                  to="/e-coaching"
                  className={`dropdown-item ${location.pathname === '/e-coaching' ? 'active' : ''}`}
                >
                  E-Coaching <i className="fa-solid fa-computer"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="/personal_training"
                  className={`dropdown-item ${location.pathname === '/personal_training' ? 'active' : ''}`}
                >
                  Personal Training <i className="fa-solid fa-person-running"></i>
                </Link>
              </li>
            </ul>
          </li>

          {/* Programmes */}
          <li className="nav-item dropdown">
            <button
              className={`nav-link dropdown-toggle text-white btn btn-link ${location.pathname.includes('/debutant') || location.pathname.includes('/intermediaire') || location.pathname.includes('/avance') || location.pathname.includes('/expert') ? 'active' : ''}`}
              id="programmesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Programmes
            </button>
            <ul className="dropdown-menu" aria-labelledby="programmesDropdown">
              <li>
                <Link
                  to="/debutant"
                  className={`dropdown-item ${location.pathname === '/debutant' ? 'active' : ''}`}
                >
                  Débutants
                </Link>
              </li>
              <li>
                <Link
                  to="/intermediaire"
                  className={`dropdown-item ${location.pathname === '/intermediaire' ? 'active' : ''}`}
                >
                  Intermédiaires
                </Link>
              </li>
              <li>
                <Link
                  to="/avance"
                  className={`dropdown-item ${location.pathname === '/avance' ? 'active' : ''}`}
                >
                  Avancés
                </Link>
              </li>
              <li>
                <Link
                  to="/expert"
                  className={`dropdown-item ${location.pathname === '/expert' ? 'active' : ''}`}
                >
                  Expert
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link
              to="/dietetique"
              className={`nav-link text-white ${location.pathname === '/dietetique' ? 'active' : ''}`}
            >
              Planning repas
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/tarifs"
              className={`nav-link text-white ${location.pathname === '/tarifs' ? 'active' : ''}`}
            >
              Tarifs
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className={`nav-link text-white ${location.pathname === '/contact' ? 'active' : ''}`}
            >
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/panier"
              className={`nav-link text-white border p-2 position-relative ${location.pathname === '/panier' ? 'active' : ''}`}
            >
              Panier <i className="bi bi-cart"></i>
              {nbreArticlePanier() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {nbreArticlePanier()}
                </span>
              )}
              <span className="text-warning ms-2">
                {prixTotalPanier()} €
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
