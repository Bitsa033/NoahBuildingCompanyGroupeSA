const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(express.static(__dirname));
// app.use(express.json());
app.use(cors());

// Servir index.html qui est à la racine
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.use(express.static(__dirname));

// Configuration Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// Route API
app.post('/api/contact', (req, res) => {

    console.log('📦 Données reçues :', req.body);

    const { nom, email, message } = req.body;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        replyTo: email,
        subject: `Nouveau message de la part de ${nom}`,
        text: `
Nom : ${nom}
Email : ${email}

Message :
${message}
        `
    };

    transporter.sendMail(mailOptions, (error, info) => {

        if (error) {
            console.error('❌ Erreur Nodemailer :', error);

            return res.status(500).json({
                success: false,
                message: "Erreur lors de l'envoi du mail"
            });
        }

        console.log('✅ Mail envoyé :', info.response);

        res.status(200).json({
            success: true,
            message: 'Email envoyé !'
        });
    });
});

app.listen(3000, () => {
    console.log('🚀 Serveur démarré sur http://localhost:3000');
});