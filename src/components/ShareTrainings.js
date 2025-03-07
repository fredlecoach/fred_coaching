// Importez d'abord Firebase dans votre projet
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, set, get, child } from 'firebase/database';

// Configuration Firebase - à remplacer par vos propres identifiants-les données sont mises dans .env
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: "https://fredlecoach-bf74f-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fredlecoach-bf74f",
  storageBucket: "fredlecoach-bf74f.firebasestorage.app",
  messagingSenderId: "1033215029653",
  appId: "1:1033215029653:web:d310278b3e429337bac69c"
};

// Initialiser Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Composant pour partager l'entraînement
export const ShareTrainingButton = ({ trainingName, training }) => {
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Génère un ID court unique
  const generateUniqueId = () => {
    return 'tr_' + Math.random().toString(36).substring(2, 10);
  };

  const handleShare = async () => {
    setIsLoading(true);
    
    try {
      // Générer un ID unique pour ce partage
      const shareId = generateUniqueId();
      
      // Créer l'objet à partager
      const shareData = {
        name: trainingName,
        ...training,
        createdAt: Date.now(),
        expiresAt: Date.now() + (30 * 24 * 60 * 60 * 1000) // Expire dans 30 jours
      };
      
      // Enregistrer dans Firebase
      await set(ref(database, 'sharedTrainings/' + shareId), shareData);
      
      // Créer un lien court
      const shareLink = `${window.location.origin}/shared-training?id=${shareId}`;
      
      // Copier le lien dans le presse-papiers
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      
      // Réinitialiser l'état "copié" après 3 secondes
      setTimeout(() => setCopied(false), 3000);
    } catch (err) {
      console.error('Erreur lors du partage', err);
      alert('Impossible de partager l\'entraînement: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      onClick={handleShare} 
      className="btn btn-info ms-2"
      title="Partager l'entraînement"
      disabled={isLoading}
    >
      {isLoading ? 
        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> :
        copied ? 'Lien copié !' : <i className="bi bi-share"></i>
      }
    </button>
  );
};

// Composant pour recevoir l'entraînement partagé
export const SharedTrainingReceiver = () => {
  const [sharedTraining, setSharedTraining] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSharedTraining = async () => {
      setLoading(true);
      const urlParams = new URLSearchParams(window.location.search);
      
      // Vérifier s'il y a un ID court
      const shareId = urlParams.get('id');
      
      if (shareId) {
        try {
          // Récupérer depuis Firebase
          const dbRef = ref(database);
          const snapshot = await get(child(dbRef, `sharedTrainings/${shareId}`));
          
          if (snapshot.exists()) {
            const data = snapshot.val();
            
            // Vérifier si le partage n'a pas expiré
            if (data.expiresAt && data.expiresAt > Date.now()) {
              setSharedTraining(data);
              setError(null);
            } else {
              setError('Ce lien de partage a expiré');
            }
          } else {
            setError('Programme non trouvé. Il a peut-être été supprimé ou le lien est invalide.');
          }
        } catch (error) {
          console.error('Erreur lors de la récupération des données', error);
          setError(`Erreur lors de la récupération des données: ${error.message}`);
        }
      } else {
        // Ancienne méthode (pour compatibilité avec les liens existants)
        const encodedTraining = urlParams.get('training');
        
        if (encodedTraining) {
          try {
            const decodedTraining = JSON.parse(decodeURIComponent(encodedTraining));
            setSharedTraining(decodedTraining);
            setError(null);
          } catch (error) {
            console.error('Erreur de décodage', error);
            setError('Impossible de décoder le lien de partage');
          }
        } else {
          setError('Aucun programme à partager dans ce lien');
        }
      }
      
      setLoading(false);
    };

    fetchSharedTraining();
  }, []);

  const handleSaveSharedTraining = () => {
    if (!sharedTraining) return;

    // Récupérer les entraînements existants depuis localStorage
    const existingTrainings = JSON.parse(localStorage.getItem('trainings') || '{}');
    
    // Générer un nom unique
    const uniqueName = generateUniqueName(sharedTraining.name, existingTrainings);

    // Créer le nouvel entraînement
    const newTraining = {
      image: sharedTraining.image || '',
      exercices: sharedTraining.exercices || []
    };

    // Mettre à jour les entraînements
    const updatedTrainings = {
      ...existingTrainings,
      [uniqueName]: newTraining
    };

    // Sauvegarder dans localStorage
    localStorage.setItem('trainings', JSON.stringify(updatedTrainings));
    
    // Rediriger ou afficher un message de succès
    alert(`Entraînement "${uniqueName}" ajouté avec succès !`);
  };

  // Fonction pour générer un nom unique
  const generateUniqueName = (originalName, existingTrainings) => {
    let newName = originalName;
    let counter = 1;

    while (existingTrainings[newName]) {
      newName = `${originalName} (Copie ${counter})`;
      counter++;
    }

    return newName;
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-2">Chargement du programme partagé...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">{error}</div>
      </div>
    );
  }

  if (!sharedTraining) {
    return (
      <div className="container mt-4">
        <div className="alert alert-info">Aucun entraînement à partager</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card">
        <div className="card-header bg-primary text-white">
          <h3>Entraînement partagé</h3>
        </div>
        <div className="card-body">
          <h4 className="card-title text-primary">{sharedTraining.name}</h4>
          
          {sharedTraining.image && (
            <img 
              src={sharedTraining.image} 
              alt="Programme" 
              className="img-fluid mb-3 rounded"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          )}

          <h5>Exercices :</h5>
          {sharedTraining.exercices && sharedTraining.exercices.length > 0 ? (
            <ul className="list-group">
              {sharedTraining.exercices.map((exercice, index) => (
                <li key={index} className="list-group-item">
                  <strong>{exercice.name}</strong>
                  <div className="text-muted">
                    Séries : {exercice.series} | 
                    Répétitions : {exercice.repetitions} | 
                    Récupération : {exercice.recuperation}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-muted">Aucun exercice dans ce programme</p>
          )}

          <button 
            onClick={handleSaveSharedTraining} 
            className="btn btn-success mt-3"
          >
            Enregistrer cet entraînement
          </button>
        </div>
      </div>
    </div>
  );
};