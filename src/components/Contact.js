import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    message: ""
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setSuccess(true);
          setError(false);
          setFormData({ nom: "", email: "", message: "" });
          setTimeout(() => setSuccess(false), 5000);
        } else {
          setError(true);
          setSuccess(false);
        }
      })
      .catch((error) => {
        console.error("Erreur :", error);
        setError(true);
        setSuccess(false);
      });
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">📩 Contacte-moi</h2>

      {success && <div className="alert alert-success">Message envoyé avec succès !</div>}
      {error && <div className="alert alert-danger">Une erreur s'est produite. Veuillez réessayer plus tard.</div>}

      <form onSubmit={handleSubmit} className="shadow p-4 rounded">
        <div className="mb-3">
          <label htmlFor="nom" className="form-label">Nom</label>
          <input
            type="text"
            className="form-control"
            id="nom"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            placeholder="Entrez votre nom"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="Entrez votre email"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="message" className="form-label">Message</label>
          <textarea
            className="form-control"
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Posez vos questions"
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">Envoyer</button>
      </form>
    </div>
  );
}
