import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Dietetique from './Dietetique';
import Debutant from './Debutant';
import Intermediaire from './Intermediaire';
import Avance from './Avance';
import Expert from './Expert';
import ECoaching from './E-Coaching';
import { programmes, debutantProgram, intermediaireProgram, avanceProgram, expertProgram } from '../utils/Programmes';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PersonalTraining from './PersonaTraining';
import Tarifs from './Tarifs';
import Panier from './Panier';
import { useState, useEffect } from 'react';
import Contact from "./Contact";

function App() {

  const [panier, setPanier] = useState([]);
  const [total, setTotal] = useState(0);

  const prestations = [
    { name: "programmes Débutants", tarif: 50, quantite: 1 },
    { name: "programmes Intermédiaires", tarif: 50, quantite: 1 },
    { name: "programmes Avancés", tarif: 50, quantite: 1 },
    { name: "programmes Experts", tarif: 50, quantite: 1 },
    { name: "Meal Planner", tarif: 80, quantite: 1 },
    { name: "Home Coaching", tarif: 1300, quantite: 1 },
    { name: "E-Coaching", tarif: 120, quantite: 1 }
  ];

  // Ajouter un produit au panier
  const addToCart = (item) => {
    setPanier(prevPanier => {
      const existingItem = prevPanier.find(p => p.name === item.name);
      if (existingItem) {
        return prevPanier.map(p =>
          p.name === item.name ? { ...p, quantite: p.quantite + 1 } : p
        );
      }
      return [...prevPanier, { ...item, quantite: 1 }];
    });
  };

  // Met à jour le total du panier
  useEffect(() => {
    const newTotal = panier.reduce((acc, item) => acc + item.tarif * item.quantite, 0);
    setTotal(newTotal);

  }, [panier]); // Le total est recalculé à chaque changement dans panier

  // Supprimer un produit du panier
  const supprimerPrestation = (name) => {
    setPanier(panier.filter((p) => p.name !== name));
  };

  // Ajouter une quantité d'un produit existant dans le panier
  const ajouter = (name) => {
    setPanier(panier.map((item) =>
      item.name === name
        ? { ...item, quantite: item.quantite + 1 }
        : item
    ));
  };

  // Diminuer la quantité d'un produit
  const diminuer = (name) => {
    setPanier(prevPanier => {
      const updatedPanier = prevPanier.map((item) =>
        item.name === name && item.quantite > 0
          ? { ...item, quantite: item.quantite - 1 }
          : item
      );
  
      // Si la quantité est 0 après la diminution, on supprime l'élément
      const itemToRemove = updatedPanier.find(item => item.name === name && item.quantite === 0);
      if (itemToRemove) {
        supprimerPrestation(name); // Appel à supprimerPrestation si la quantité est 0
      }
  
      return updatedPanier; // Retourne le panier mis à jour
    });
  };
  

  // Vider le panier
  const deletePanier = () => {
    setPanier([]);
    setTotal(0);
  };


  // Calcul du nombre total d'articles
const nbreArticlePanier = () => {
  return panier.reduce((total, item) => total + item.quantite, 0);
};

// Calcul du prix total du panier
const prixTotalPanier = () => {
  return panier.reduce((total, item) => total + item.tarif * item.quantite, 0);
};

  
  

  return (
    <Router>  {/* Router doit englober toute l'application */}
      <Header nbreArticlePanier={nbreArticlePanier}  prixTotalPanier={prixTotalPanier} />
        <Routes>
          <Route path="/" element={<Home programmes={programmes} />} />
          <Route path='/dietetique' element={<Dietetique />} />
          <Route path='/debutant' element={<Debutant debutantProgram={debutantProgram}
                                                     addCart={addToCart} 
                                                     prestation={{ name: "programmes Débutants", tarif: 50}}  />} />
          <Route path='/intermediaire' element={<Intermediaire intermediaireProgram={intermediaireProgram}
                                                               addCart={addToCart}
                                                               prestation={{ name: "programmes Intermediaires", tarif: 50}} />} />
          <Route path="/avance" element={ <Avance avanceProgram={avanceProgram}
                                                  addCart={addToCart}
                                                  prestation={{ name: "programmes Avancés", tarif: 50 }} />} />
          <Route path="/expert" element={ <Expert expertProgram={expertProgram}
                                                  addCart={addToCart}
                                                  prestation= {{ name: "programmes Experts", tarif: 50}} />} />
          <Route path='/e-coaching' element={ <ECoaching prestation={{ name: "E-coaching", tarif: 120}}
                                                         addCart={addToCart} />} />
          <Route path='/personal_training' element={ <PersonalTraining addCart={addToCart}
                                                                       prestation={{ name: "Home coaching", tarif: 1300}} />} />
          <Route path="/tarifs" element={ <Tarifs prestations={prestations}
                                                  addToCart={addToCart} 
                                                  ajouter={ajouter}
                                                  diminuer={diminuer}
                                                  panier={panier}
                                                  />} />
          <Route path="/panier" element={ <Panier panier={panier}
                                                  total={total} 
                                                  deletePanier={deletePanier} 
                                                  supprimerPrestation={supprimerPrestation}
                                                  ajouter={ajouter}
                                                  diminuer={diminuer}
                                                  />} />
            <Route path="/contact" element={ <Contact />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
