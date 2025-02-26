require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

app.post('/contact', (req, res) => {
  const { nom, email, message } = req.body;

  console.log("Message reçu :", { nom, email, message });

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

app.post('/order', async (req, res) => {
  const { customer, order } = req.body;

  console.log("Nouvelle commande reçue :", { customer, order });

  const formatItems = (items) => {
    return items.map(item => 
      `- ${item.name}: ${item.tarif}€ x ${item.quantite} = ${item.tarif * item.quantite}€`
    ).join('\n');
  };

  // Email pour l'administrateur
  const adminMailOptions = {
    from: process.env.EMAIL_USER,
    to: 'f.roblot.coulanges@gmail.com',
    subject: `Nouvelle commande de ${customer.prenom} ${customer.nom}`,
    text: `
Nouvelle commande:

Informations client:
------------------
Nom: ${customer.nom}
Prénom: ${customer.prenom}
Email: ${customer.email}
Tel: ${customer.phone}
Adresse: ${customer.adresse}

Détails de la commande:
---------------------
${formatItems(order.items)}

Total: ${order.total}€

Date de la commande: ${new Date().toLocaleString('fr-FR')}
    `,
  };

  // Email pour le client
  const clientMailOptions = {
    from: process.env.EMAIL_USER,
    to: customer.email,
    subject: 'Confirmation de votre commande',
    text: `
Cher(e) ${customer.prenom} ${customer.nom},

Nous avons bien reçu votre commande. Elle sera traitée et envoyée dès confirmation du paiement.

Récapitulatif de votre commande:
------------------------------
${formatItems(order.items)}

Total: ${order.total}€

Nous vous remercions de votre confiance.

Cordialement,
L'équipe
    `
  };

  try {
    // Envoi des deux emails
    await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(clientMailOptions)
    ]);

    console.log('Emails envoyés avec succès');
    res.status(200).json({ 
      success: true, 
      message: "Commande enregistrée avec succès!" 
    });
  } catch (err) {
    console.error('Erreur lors de l\'envoi des emails:', err);
    res.status(500).json({ 
      success: false, 
      message: "Erreur lors de l'envoi de la commande, veuillez réessayer plus tard." 
    });
  }
});

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));