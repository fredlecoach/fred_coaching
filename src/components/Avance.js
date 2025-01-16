export default function Avance({avanceProgram, addCart, prestation}) {
  return (
    <>
      <div className="container" style={{marginBottom: "100px"}}>
        <div className="border">
        <h1 className="text-center m-5">Programmes avancés</h1>
          <div className="row row-cols-1 row-cols-md-3 m-3">
            {avanceProgram.map((ap) => (
              <div key={ap.name}>
                <div className="card">
                  <img 
                    src={ap.photo} 
                    alt={ap.name} 
                    className="w-100 img-fluid card-img-top object-fit-cover"
                    style={{maxHeight:"500px", minHeight:"500px"}} 
                  />
                  <div className="card-body">
                    <h5 className="card-title">{ap.name}</h5>
                    <p className="card-text">{ap.description}</p>
                    <p className="card-text">
                      Durée de l'entraînement : {ap.duration} min
                    </p>
                    <p className="card-text">Niveau : <span className="text-success fw-bold" >{ap.level}</span> </p>
                    <p className="card-text">Difficulté : {ap.difficulty}</p>
                  </div>
                </div>
              </div>
            ))}
            </div>
            <div className="d-flex justify-content-center my-5">
              <button className="btn btn-dark py-3 px-4" onClick={ ()=>{ addCart(prestation); alert('Programmes "Avancés" ajouté au panier')} }>Ajouter au panier <i className="bi bi-caret-right"></i></button>
            </div>
        </div>
      </div>
    </>
  );
}
