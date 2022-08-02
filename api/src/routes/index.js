const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

const videogamesRouter = require('./videogames.js');
const genresRouter = require('./genre.js')


// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/videogames' , videogamesRouter);
router.use('/genres' , genresRouter);


module.exports = router;
