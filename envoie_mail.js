const nodemailer = require('nodemailer');

var user_mail;
var user_subjet;
var user_text;

// 1. Créer le transporteur SMTP avec Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'bitsapascal033@gmail.com',
    pass: 'pell hpbf lclm kzmh'
  }
});

// 2. Définir les options du message
const mailOptions = {
  from: 'bitsapascal033@gmail.com',
  to: user_mail,
  subject: user_subjet,
  text: user_text
};

// 3. Envoyer l'e-mail
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log('Erreur lors de l’envoi : ', error);
  } else {
    console.log('E-mail envoyé avec succès : ', info.response);
  }
});