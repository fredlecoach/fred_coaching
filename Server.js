require('dotenv').config(); // Charger les variables d'environnement

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Utiliser les variables d'environnement
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Utilisation de la variable d'environnement
    pass: process.env.EMAIL_PASS, // Utilisation de la variable d'environnement
  },
});

app.post('/contact', (req, res) => {
  const { nom, email, message } = req.body;

  console.log("Message reçu :", { nom, email, message });

  // Création du mail à envoyer
  const mailOptions = {
    from: email,
    to: 'f.roblot.coulanges@gmail.com',
    subject: `Nouveau message de ${nom}`,
    text: `Message de: ${nom}\nEmail: ${email}\nMessage: ${message}`,
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) {
      console.error('Erreur lors de l\'envoi du message:', err);
      return res.status(500).json({ success: false, message: "Erreur interne, essayez à nouveau plus tard." });
    }

    console.log('Message envoyé:', info.response);
    res.status(200).json({ success: true, message: "Message envoyé avec succès !" });
  });
});

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));
