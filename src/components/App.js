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

function App() {
  return (
    <Router>  {/* Router doit englober toute l'application */}
      <Header />
        <Routes>
          <Route path="/" element={<Home programmes={programmes} />} />
          <Route path='/dietetique' element={<Dietetique />} />
          <Route path='/debutant' element={<Debutant debutantProgram={debutantProgram} />} />
          <Route path='/intermediaire' element={<Intermediaire intermediaireProgram={intermediaireProgram} /> } />
          <Route path="/avance" element={ <Avance avanceProgram={avanceProgram} />} />
          <Route path="/expert" element= { <Expert expertProgram={expertProgram} />} />
          <Route path='/e-coaching' element={ <ECoaching />} />
          <Route path='/personal_training' element={ <PersonalTraining />} />
          <Route path="/tarifs" element={ <Tarifs />} />
          <Route path="/panier" element={ <Panier />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;
