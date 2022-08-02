const {Router} = require('express');
const express = require('express');
const axios = require('axios');
const {Videogame , Genre} = require('../db');
const router = Router();
const {API_KEY} = process.env ;





// get



const getApiInfo = async ()=> {
    try{    

    let page1 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=1`);
    let page2 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=2`);
    let page3 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=3`);
    let page4 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=4`);
    let page5 = axios.get(`https://api.rawg.io/api/games?key=${API_KEY}&page=5`);

    let pageALL = await Promise.all([page1 , page2 , page3 , page4 , page5]);

    page1 = pageALL[0].data.results;
    page2 = pageALL[1].data.results;
    page3 = pageALL[2].data.results;
    page4 = pageALL[3].data.results;
    page5 = pageALL[4].data.results;

    const pages = page1.concat(page2).concat(page3).concat(page4).concat(page5);

    
    let getApiInfo = pages.map(e => {   
        return {
            id: e.id,
            name: e.name,
            released: e.released,
            rating: e.rating,
            platforms: e.platforms.map(p=>p.platform.name),
            image: e.background_image,
            genres: e.genres.map(g=>g.name),
        };
    });
    return getApiInfo;
}
catch (error)
    {console.log(error);
}

};




const getDbInfo = async ()=> {
    return await Videogame.findAll({
        include:{
            model: Genre,
            attributes: ['name'],
            through: {
                attributes: [],
            },
        }
    })
}


const getAllVideogames = async () => {
    let apiInfo = await getApiInfo();
    let dbInfo = await getDbInfo();
    let infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/' , async (req , res) => {
    const name = req.query.name
    let videogamesTotal = await getAllVideogames();
    if (name){
        let gameName = await videogamesTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
        gameName.length?
        res.status(200).send(gameName) :
        res.status(400).send('Game not found');
    } else {
        res.status(200).send(videogamesTotal)
    }
})

// get by id

router.get('/:id' , async (req , res) => {
    try{
    const id = req.params.id;
    if(id.includes("-")){
        let game = await Videogame.findOne({
            where: {id: id},
            include : {
                model: Genre,
                attributes: ["name"]
            }
        })
        res.status(200).send(game)
    } else {
        let game = await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
        if(game){
        let data = game.data
        let videogame = {
            id: data.id,
            name: data.name,
            description: data.description_raw,
            released: data.released,
            image: data.background_image,
            rating: data.rating,
            platforms: data.platforms.map(p => p.platform.name),
            genres: data.genres.length > 0 ? data.genres.map(e => e.name) : ["Not info available"]
        }
        res.status(200).send(videogame)
    } else {
        res.status(400).send('Game not found')
    }
    } 
    } catch (error) {
        console.log(error)
    }
})

//post


router.post('/' , async (req , res)=>{
    let {
        name,
        description,
        released,
        rating,
        platforms,
        image,
        createdInDb,
        genres,
    } = req.body

    try {
        const nameControl = await Videogame.findOne({
            where: {
                name: name,
            },
        })
        if(!nameControl) {
            if(name && description && genres && platforms){
    let gameCreated = await Videogame.create({
        name,
        description,
        released,
        rating,
        platforms,
        image,
        createdInDb,
    })

    let genreDb = await Genre.findAll({
        where: {name: genres }
    })

    gameCreated.addGenre(genreDb)
    res.send('Videogame added')

}else {
    res.status(404).send('Please, complete all fields')
}
}
} 
catch(error){
    res.status(500).json(error);
}
})



module.exports = router