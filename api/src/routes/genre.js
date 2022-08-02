const {Router} = require('express');
const express = require('express');
const axios = require('axios');
const {Videogame , Genre} = require('../db');
const router = Router();
const {API_KEY} = process.env ;
const genres = `https://api.rawg.io/api/genres?key=${API_KEY}`

//get genres 

router.get('/' , async(req , res)=> {
    const genresApi = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = genresApi.data.results.map(g => {
        return {
            name: g.name
        }
    })
    genres.forEach(g => {
        Genre.findOrCreate({
            where: {name: g.name}
        })
    });
    const allGenres = await Genre.findAll();
    res.send(allGenres);
})







module.exports = router
