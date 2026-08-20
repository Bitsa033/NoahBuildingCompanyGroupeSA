const nodemailer = require('nodemailer');

app.use(express.static(__dirname));
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

module.exports = async (req, res) => {

    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Méthode non autorisée'
        });
    }

    const { nom, email, message } = req.body;

    try {

        await transporter.sendMail({
            from: {
                name: nom,
                address: process.env.EMAIL_USER
            },
            to: process.env.EMAIL_USER,
            replyTo: email,
            subject: `Nouveau message de la part de ${nom}`,
            text: `
            Nom : ${nom}
            Email : ${email}

            Message :
            ${message}
    `
        });

        return res.status(200).json({
            success: true,
            message: 'Email envoyé !'
        });

    } catch (error) {

        console.error('Erreur Nodemailer :', error);

        return res.status(500).json({
            success: false,
            message: "Erreur lors de l'envoi du mail"
        });
    }
};