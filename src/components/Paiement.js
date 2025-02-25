import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export default function Paiement() {
  const location = useLocation();
  const navigate = useNavigate();
  const { panier, total } = location.state || { panier: [], total: 0 };
  
  const [customerInfo, setCustomerInfo] = useState({
    nom: '',
    prenom: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    const orderData = {
      customer: customerInfo,
      order: {
        items: panier,
        total: total
      },
      timestamp: new Date().toISOString()
    };

    try {
      const response = await fetch('http://localhost:5000/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Une erreur est survenue');
      }

      // Redirection vers PayPal avec le montant total
      window.location.href = `https://paypal.me/fredlecoach/${total}`;
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de l\'envoi de la commande');
      setIsSubmitting(false);
    }
  };

  if (!panier || panier.length === 0) {
    navigate('/panier');
    return null;
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-md-8 mx-auto">
          <div className="border rounded shadow">
            <div className="card-body p-5">
              <h2 className="card-title text-center mb-4">Finaliser votre commande</h2>
              
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <h3 className="h5 mb-3">Vos informations</h3>
                    <div className="mb-3">
                      <label htmlFor="nom" className="form-label">Nom</label>
                      <input
                        type="text"
                        className="form-control"
                        id="nom"
                        name="nom"
                        value={customerInfo.nom}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="prenom" className="form-label">Prénom</label>
                      <input
                        type="text"
                        className="form-control"
                        id="prenom"
                        name="prenom"
                        value={customerInfo.prenom}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={customerInfo.email}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>

                  <div className="col-md-6">
                    <h3 className="h5 mb-3">Récapitulatif de votre commande</h3>
                    <div className="border rounded bg-light">
                      <div className="card-body p-3">
                        {panier.map((item) => (
                          <div key={item.name} className="mb-2">
                            <span className="fw-bold">{item.name}</span>
                            <br />
                            <small className="text-muted">
                              {item.tarif}€ x {item.quantite} = {item.tarif * item.quantite}€
                            </small>
                          </div>
                        ))}
                        <hr />
                        <div className="h5 mb-0">Total: {total}€</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Traitement en cours...' : 'Payer avec PayPal'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}