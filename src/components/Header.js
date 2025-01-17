import { Link } from "react-router-dom";
import logo from "../styles/images/logo_orange.png";

export default function Header( { nbreArticlePanier, prixTotalPanier } ) {
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
            <Link to="/" className="nav-link text-white">
              Home
            </Link>
          </li>

          {/* Coachings */}
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle text-white btn btn-link"
              id="coachingsDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Coachings <i className="fa-solid fa-dumbbell"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="coachingsDropdown">
              <li>
                <Link to="/e-coaching" className="dropdown-item">
                  E-Coaching <i className="fa-solid fa-computer"></i>
                </Link>
              </li>
              <li>
                <Link to="/personal_training" className="dropdown-item">
                  Personal Training <i className="fa-solid fa-person-running"></i>
                </Link>
              </li>
            </ul>
          </li>

          {/* Programmes */}
          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle text-white btn btn-link"
              id="programmesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Programmes
            </button>
            <ul className="dropdown-menu" aria-labelledby="programmesDropdown">
              <li>
                <Link to="/debutant" className="dropdown-item">
                  Débutants
                </Link>
              </li>
              <li>
                <Link to="/intermediaire" className="dropdown-item">
                  Intermédiaires
                </Link>
              </li>
              <li>
                <Link to="/avance" className="dropdown-item">
                  Avancés
                </Link>
              </li>
              <li>
                <Link to="/expert" className="dropdown-item">
                  Expert
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <Link to="/dietetique" className="nav-link text-white">
              Planning repas
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/tarifs" className="nav-link text-white">
              Tarifs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link text-white">
              Contact
            </Link>
          </li>
          <li className="nav-item ">
            <Link to="/panier" className="nav-link text-white border p-2 position-relative">
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
