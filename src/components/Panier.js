import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import "../styles/css/Panier.css";
import 'animate.css';

export default function Panier({ panier, total, ajouter, supprimerPrestation, diminuer, deletePanier }) {
  const navigate = useNavigate();

  useEffect(() => {
    const shakePanierVide = document.querySelector(".bg-panier");
    if (shakePanierVide) {
      shakePanierVide.classList.add("animate__animated", "animate__shakeX");
    }

    setTimeout(() => {
      if (shakePanierVide) {
        shakePanierVide.classList.remove("animate__animated", "animate__shakeX");
      }
    }, 1000);
  }, [panier]);

  const handleCheckout = () => {
    if (total > 0) {
      navigate('/paiement', { state: { panier, total } });
    } else {
      alert("Votre panier est vide !");
    }
  };

  if (panier.length === 0) {
    return (
      <div className="bg-panier">
        <h1 className="bg-light border p-3">Le panier est vide</h1>
      </div>
    );
  }

  return (
    <div className="container border py-4 mb-5">
      <h2 className="text-center mb-4">Mon Panier</h2>

      {panier.map((prestation) => (
        <div key={prestation.name} className="card mb-3 shadow-sm">
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-6">
                <span className="fw-bold text-primary">{prestation.name}</span>
                <p>{prestation.tarif} x {prestation.quantite} = {prestation.tarif * prestation.quantite} €</p>
              </div>

              <div className="col-md-6 d-flex justify-content-end align-items-center">
                <button className="btn btn-diminue me-2" onClick={() => diminuer(prestation.name)}>-</button>
                <button className="btn btn-ajoute me-2" onClick={() => ajouter(prestation.name)}>+</button>
                <button className="btn btn-annule" onClick={() => supprimerPrestation(prestation.name)}>
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <div className="text-end mt-4">
        <h3>Total : {total}€</h3>
        <button className="btn btn-success mt-2" onClick={handleCheckout}>
          Procéder au paiement
        </button>
        <br />
        <button className="btn btn-danger mt-2" onClick={deletePanier}>
          Vider le panier <i className="bi bi-trash-fill"></i>
        </button>
      </div>
    </div>
  );
}