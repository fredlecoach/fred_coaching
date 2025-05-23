export default function Expert({expertProgram, addCart, prestation}) {
  return (
    <>
      <div className="container" style={{marginBottom: "100px"}}>
      <div className="border">
      <h1 className="text-center m-5">Programmes Intermédiaires</h1>
        <div className="row row-cols-1 row-cols-md-3 m-3">
          {expertProgram.map((ep) => (
            <div key={ep.name}>
              <div className="card">
                <img 
                  src={ep.photo} 
                  alt={ep.name} 
                  className="w-100 img-fluid card-img-top object-fit-cover"
                  style={{maxHeight:"500px", minHeight:"500px"}} 
                />
                <div className="card-body">
                  <h5 className="card-title">{ep.name}</h5>
                  <p className="card-text">{ep.description}</p>
                  <p className="card-text">
                    Durée de l'entraînement : {ep.duration} min
                  </p>
                  <p className="card-text">Niveau : <span className="text-success fw-bold" >{ep.level}</span> </p>
                  <p className="card-text">Difficulté : {ep.difficulty}</p>
                  {/* <p className="card-text">Tarif : {ep.price} €</p> */}
                </div>
              </div>
            </div>
          ))}
          </div>
            <div className="d-flex justify-content-center my-5">
              <button className="btn btn-dark py-3 px-4" onClick={ ()=>{ addCart(prestation); alert('Programmes "Experts" ajouté au panier')} }>Ajouter le pack au panier <i className="bi bi-caret-right"></i> 50 €</button>
            </div>
        </div>
      </div>
    </>
  );
}
