import React, { useState, useRef } from "react";
import trainingsImage from "../styles/images/mesProgrammes.jpg";
import '../styles/css/PlanningProgram.css';

export default function PlanningProgram({
  persoTrainings,
  addProgramme,
  deleteTraining,
  addExercice,
  deleteExercice,
  modifExercice,
  updateTrainingImage,
}) {
  const [trainingForm, setTrainingForm] = useState({ programme: "", image: "" });
  const [exerciceForm, setExerciceForm] = useState({
    name: "",
    series: "",
    repetitions: "",
    poids: "",
    recuperation: "",
  });
  const [editingExercice, setEditingExercice] = useState(null);
  const [visibleForms, setVisibleForms] = useState({});
  const imageInputRefs = useRef({});

  const handleChangeProgramme = (e) => {
    const { name, value } = e.target;
    setTrainingForm({ ...trainingForm, [name]: value });
  };

  const handleImageChange = (e) => {
    if (e.target.files?.[0]) {
      setTrainingForm({
        ...trainingForm,
        image: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleUpdateProgramImage = (e, trainingName) => {
    if (e.target.files?.[0]) {
      const newImageUrl = URL.createObjectURL(e.target.files[0]);
      updateTrainingImage(trainingName, newImageUrl);
    }
  };

  const handleChangeExercice = (e) => {
    const { name, value } = e.target;
    setExerciceForm({
      ...exerciceForm,
      [name]: value,
    });
  };

  const handleProgrammeSubmit = (e) => {
    e.preventDefault();
    if (!trainingForm.programme.trim()) return;
    addProgramme(trainingForm);
    setTrainingForm({ programme: "", image: "" });
    // Initialiser la visibilité du formulaire pour le nouveau programme
    setVisibleForms(prev => ({
      ...prev,
      [trainingForm.programme]: true
    }));
  };

  const handleExerciceSubmit = (e, trainingName) => {
    e.preventDefault();
    if (editingExercice !== null) {
      modifExercice(trainingName, editingExercice, exerciceForm);
      setEditingExercice(null);
    } else {
      addExercice(trainingName, exerciceForm);
    }
    setExerciceForm({
      name: "",
      series: "",
      repetitions: "",
      poids: "",
      recuperation: "",
    });
  };

  const startEditingExercice = (trainingName, exercice, index) => {
    setExerciceForm(exercice);
    setEditingExercice(index);
    // Assurer que le formulaire est visible lors de l'édition
    setVisibleForms(prev => ({
      ...prev,
      [trainingName]: true
    }));
  };

  const toggleForm = (trainingName) => {
    setVisibleForms(prev => ({
      ...prev,
      [trainingName]: !prev[trainingName]
    }));
  };

  const triggerImageInput = (trainingName) => {
    imageInputRefs.current[trainingName]?.click();
  };

  return (
    <div className="container mt-4">
      <h2>Planning d'entraînement</h2>

      {/* Formulaire pour créer un nouveau programme */}
      <form onSubmit={handleProgrammeSubmit} >
        <input
          type="text"
          name="programme"
          className="form-control mb-2"
          onChange={handleChangeProgramme}
          value={trainingForm.programme}
          placeholder="Nom du programme"
        />
        <input
          type="file"
          className="form-control mb-2"
          onChange={handleImageChange}
          accept="image/*"
        />
        <button type="submit" className="btn btn-primary">
          Créer Programme
        </button>
      </form>

      {/* ligne de séparation */}
      <hr className="my-5"/>

      {/* Affichage des programmes */}
      <div className="row row-cols-1 bouton-program">
        {Object.entries(persoTrainings).map(([trainingName, training]) => (
          <div className="col" key={trainingName}>
            <div className="mb-5">
              <div className="position-relative">
                <img
                  src={training.image || trainingsImage}
                  className="card-img-top w-100 object-fit-cover"
                  style={{ height: "400px", cursor: "pointer", borderRadius: "10px 10px 0 0" }}
                  alt={trainingName}
                  onClick={() => triggerImageInput(trainingName)}
                  title="Cliquez pour modifier l'image"
                />
                <input
                  type="file"
                  ref={el => imageInputRefs.current[trainingName] = el}
                  className="d-none"
                  accept="image/*"
                  onChange={(e) => handleUpdateProgramImage(e, trainingName)}
                />
                <div 
                  className="position-absolute top-0 end-0 m-2 p-2 bg-dark bg-opacity-75 text-white rounded"
                  style={{ cursor: "pointer" }}
                  onClick={() => triggerImageInput(trainingName)}
                >
                  <i className="bi bi-camera-fill"></i> 
                </div>
              </div>
              <div className=" p-3" style={{boxShadow: "5px 10px 30px gray", borderRadius:"0 0 10px 10px"}}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="card-title text-uppercase text-primary mb-0">{trainingName}</h5>
                  <button 
                    onClick={() => deleteTraining(trainingName)} 
                    className="btn btn-danger"
                  >
                    Supprimer le programme
                  </button>
                </div>

                {/* Liste des exercices */}
                <ul className="list-unstyled">
                  {training.exercices?.map((exercice, index) => (
                    <li key={index} className="border-bottom py-2">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <strong className="text-uppercase d-flex flex-grow-1" style={{color:"#cd00ff"}}>{exercice.name}</strong>
                          <span style={{color: "#be8a23"}}>Séries : {exercice.series} </span>
                          <span className="text-primary d-flex flex-grow-1">Répétitions : {exercice.repetitions} </span>
                          <span className="d-flex flex-grow-1">{exercice.poids && `Charge de travail : ${exercice.poids} `}</span>
                          <span style={{color: "#519718"}} className="d-flex flex-grow-1">{exercice.recuperation && ` Récup : ${exercice.recuperation}`}</span>
                        </div>
                        <div>
                          <button 
                            className="btn btn-warning btn-sm me-2"
                            onClick={() => startEditingExercice(trainingName, exercice, index)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button 
                            className="btn btn-danger btn-sm"
                            onClick={() => deleteExercice(trainingName, index)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Formulaire d'exercice */}
                <fieldset>
                  <legend style={{color: "#1cc2c5", fontWeight: "bold"}}>
                    {visibleForms[trainingName] ? 'Masquer le formulaire ' : 'Ajouter un exercice '}
                    <button 
                      className="btn btn-sm" 
                      style={{backgroundColor: "#1cc2c5"}} 
                      onClick={() => toggleForm(trainingName)}
                    >
                      {visibleForms[trainingName] ? <i className="bi bi-x"></i> : <i className="bi bi-check"></i>}
                    </button>
                  </legend>
                  
                  {visibleForms[trainingName] && (
                    <form onSubmit={(e) => handleExerciceSubmit(e, trainingName)} className="mt-3">
                      <div className="mb-2" id={`formulaire-${trainingName}`}>
                        <label className="form-label">Nom de l'exercice :</label>
                        <input
                          type="text"
                          name="name"
                          value={exerciceForm.name}
                          onChange={handleChangeExercice}
                          className="form-control"
                          placeholder="squat"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Nombre de séries :</label>
                        <input
                          type="number"
                          name="series"
                          value={exerciceForm.series}
                          onChange={handleChangeExercice}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Nombre de répétitions :</label>
                        <input
                          type="text"
                          name="repetitions"
                          value={exerciceForm.repetitions}
                          onChange={handleChangeExercice}
                          className="form-control"
                          required
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Charge de travail (kg) :</label>
                        <input
                          type="text"
                          name="poids"
                          value={exerciceForm.poids}
                          onChange={handleChangeExercice}
                          placeholder="ex : dégressif, pyramidale, 1x20 2x10"
                          className="form-control"
                        />
                      </div>
                      <div className="mb-2">
                        <label className="form-label">Temps de récupération :</label>
                        <input
                          type="text"
                          name="recuperation"
                          value={exerciceForm.recuperation}
                          onChange={handleChangeExercice}
                          className="form-control"
                          placeholder="1 mn, 30s"
                          required
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        {editingExercice !== null ? 'Modifier l\'exercice' : 'Ajouter l\'exercice'}
                      </button>
                      {editingExercice !== null && (
                        <button
                          type="button"
                          className="btn btn-secondary ms-2"
                          onClick={() => {
                            setEditingExercice(null);
                            setExerciceForm({
                              name: "",
                              series: "",
                              repetitions: "",
                              poids: "",
                              recuperation: "",
                            });
                          }}
                        >
                          Annuler
                        </button>
                      )}
                    </form>
                  )}
                </fieldset>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}