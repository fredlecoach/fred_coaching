require('dotenv').config();

const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const app = express();
const PORT = 5000;

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

// Endpoint pour les commandes
app.post('/order', (req, res) => {
  const { customer, order } = req.body;

  console.log("Nouvelle commande reçue :", { customer, order });

  const formatItems = (items) => {
    return items.map(item => 
      `- ${item.name}: ${item.tarif}€ x ${item.quantite} = ${item.tarif * item.quantite}€`
    ).join('\n');
  };

  const mailOptionsAdmin = {
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

Détails de la commande:
---------------------
${formatItems(order.items)}

Total: ${order.total}€

Date de la commande: ${new Date().toLocaleString('fr-FR')}
    `,
  };

  // Envoi de l'email à l'administrateur
  transporter.sendMail(mailOptionsAdmin, (err, info) => {
    if (err) {
      console.error('Erreur lors de l\'envoi de la commande:', err);
      return res.status(500).json({ 
        success: false, 
        message: "Erreur lors de l'envoi de la commande, veuillez réessayer plus tard." 
      });
    }

    console.log('Commande envoyée à l\'administrateur:', info.response);

    // Envoi de l'email de confirmation au client
    const mailOptionsClient = {
      from: process.env.EMAIL_USER,
      to: customer.email,
      subject: 'Confirmation de votre commande',
      text: `
        Merci pour votre commande !

        Votre commande a bien été enregistrée et est en cours de traitement. Voici les détails :
        --------------------------
        Nom : ${customer.prenom} ${customer.nom}
        Email : ${customer.email}

        Détails de votre commande :
        ${formatItems(order.items)}

        Total : ${order.total}€

        Date de la commande : ${new Date().toLocaleString('fr-FR')}

        Nous vous enverrons votre programme après vérification du paiement.

        Cordialement,
        L'équipe
              `,
    };

    // Envoi de l'email au client
    transporter.sendMail(mailOptionsClient, (err, info) => {
      if (err) {
        console.error('Erreur lors de l\'envoi de l\'email de confirmation:', err);
        return res.status(500).json({ 
          success: false, 
          message: "Erreur lors de l'envoi de la confirmation au client." 
        });
      }

      console.log('Confirmation envoyée au client:', info.response);
      res.status(200).json({ 
        success: true, 
        message: "Commande enregistrée avec succès et confirmation envoyée au client !" 
      });
    });
  });
});

app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));

