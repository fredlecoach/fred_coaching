import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import paypal from "../styles/images/paypal-3.svg";
import "../styles/css/Paiement.css"

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export default function Paiement() {
  const location = useLocation();
  const navigate = useNavigate();
  const { panier, total } = location.state || { panier: [], total: 0 };
  
  const [customerInfo, setCustomerInfo] = useState({
    nom: '',
    prenom: '',
    email: '',
    phone: '',
    adresse:''
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
  
    const phoneRegex = /^(06|07)\d{8}$/;
    if (!phoneRegex.test(customerInfo.phone)) {
      setError('Veuillez entrer un numéro de téléphone valide sans espaces (10 chiffres commençant par 06 ou 07)');
      setIsSubmitting(false);
      return;
    }
  
    const orderData = {
      customer: customerInfo,
      order: {
        items: panier,
        total: total
      },
      timestamp: new Date().toISOString()
    };
  
    try {
      const response = await fetch(`${API_URL}/order`, {
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
  
      window.location.href = `https://paypal.me/fredlecoach/${total}`;
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de l\'envoi de la commande');
      setIsSubmitting(false);
    }
  };

  if (!panier || panier.length === 0) {
    navigate('/panier');
    return ;
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
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">N° de mobile</label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        placeholder="06XXXXXXXX ou 07XXXXXXXX"
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="adresse" className="form-label">Adresse complète</label>
                      <input
                        type="text"
                        className="form-control"
                        id="adresse"
                        name="adresse"
                        value={customerInfo.adresse}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        placeholder="ex : 8 rue de la paix, 75001 Paris"
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
                    <div className='text-center mt-5'>
                      <img src= {paypal} alt='logo paypal' className='w-50' />
                    </div>
                  </div>
                </div>

                <div className="d-flex justify-content-center mt-4">
                  <button 
                    type="submit" 
                    className="btn btn-lg fw-bold d-flex align-items-center justify-content-center btn-paypal"
                    style={{ boxShadow: "10px 5px 1px #ecba2c" }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Traitement en cours...' : 'Payer avec '} 
                    <img src={paypal} alt="PayPal" height="20" className="ms-2" />
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