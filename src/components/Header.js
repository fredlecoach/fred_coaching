import { Link, useLocation } from "react-router-dom";
import logo from "../styles/images/logo_orange.png";

export default function Header({ nbreArticlePanier, prixTotalPanier }) {
  const location = useLocation();

  // Styles dynamiques
  const activeStyle = {
    fontWeight: "bold",
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "5px",
  };

  const hoverStyle = {
    textDecoration: "underline",
    textDecorationThickness: "2px",
    textUnderlineOffset: "5px",
  };

  return (
    <header className="navbar navbar-expand-lg bg-dark" style={{ marginBottom: "100px" }}>
      <nav className="container-fluid">
        <Link className="navbar-brand" to="/">
          <img
            src={logo}
            alt="Logo Fred le Coach"
            className="d-inline-block align-text-top"
            style={{ height: "280px" }}
          />
        </Link>

        <ul className="navbar-nav ms-auto d-flex">
          <li className="nav-item">
            <Link
              to="/"
              className="nav-link text-white"
              style={location.pathname === '/' ? activeStyle : {}}
            >
              Home
            </Link>
          </li>

          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle text-white btn btn-link"
              id="coachingsDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={
                location.pathname.includes('/e-coaching') || location.pathname.includes('/personal_training')
                  ? activeStyle
                  : {}
              }
            >
              Coachings <i className="fa-solid fa-dumbbell"></i>
            </button>
            <ul className="dropdown-menu" aria-labelledby="coachingsDropdown">
              <li>
                <Link
                  to="/e-coaching"
                  className="dropdown-item"
                  style={location.pathname === '/e-coaching' ? activeStyle : {}}
                >
                  E-Coaching <i className="fa-solid fa-computer"></i>
                </Link>
              </li>
              <li>
                <Link
                  to="/personal_training"
                  className="dropdown-item"
                  style={location.pathname === '/personal_training' ? activeStyle : {}}
                >
                  Personal Training <i className="fa-solid fa-person-running"></i>
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item dropdown">
            <button
              className="nav-link dropdown-toggle text-white btn btn-link"
              id="programmesDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              style={
                ['/debutant', '/intermediaire', '/avance', '/expert'].some(path =>
                  location.pathname.includes(path)
                )
                  ? activeStyle
                  : {}
              }
            >
              Programmes
            </button>
            <ul className="dropdown-menu" aria-labelledby="programmesDropdown">
              {['/debutant', '/intermediaire', '/avance', '/expert'].map((path, index) => (
                <li key={index}>
                  <Link
                    to={path}
                    className="dropdown-item"
                    style={location.pathname === path ? activeStyle : {}}
                  >
                    {path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
                  </Link>
                </li>
              ))}
            </ul>
          </li>

          <li className="nav-item">
            <Link
              to="/dietetique"
              className="nav-link text-white"
              style={location.pathname === '/dietetique' ? activeStyle : {}}
            >
              Planning repas
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/tarifs"
              className="nav-link text-white"
              style={location.pathname === '/tarifs' ? activeStyle : {}}
            >
              Tarifs
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/contact"
              className="nav-link text-white"
              style={location.pathname === '/contact' ? activeStyle : {}}
            >
              Contact
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/panier"
              className="nav-link text-white border p-2 position-relative"
              style={location.pathname === '/panier' ? activeStyle : {}}
            >
              Panier <i className="bi bi-cart"></i>
              {nbreArticlePanier() > 0 && (
                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary">
                  {nbreArticlePanier()}
                </span>
              )}
              <span className="text-warning ms-2">{prixTotalPanier()} €</span>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
