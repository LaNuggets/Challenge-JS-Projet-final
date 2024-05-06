import express from 'express';
const app = express();
const port = 3000;

app.use(express.static('publics'));

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
