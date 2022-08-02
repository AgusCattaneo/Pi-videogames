import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        var json = await axios ("http://localhost:3001/videogames", {
        });
        return dispatch({
           type: 'GET_VIDEOGAMES',
           payload: json.data 
        }) 
    }
}

export function getVideogamesName(name){
    return async function(dispatch){
        try {
            var json = await axios.get("http://localhost:3001/videogames?name=" + name)
            return dispatch({
                type: "GET_NAME_GAME",
                payload: json.data
            })
        }catch(error){
            console.log(error)
        }
    }
}

export function getGenres(){
    return async function(dispatch){
        var info = await axios("http://localhost:3001/genres" , {

        });
        return dispatch ({type: "GET_GENRES" , payload: info.data});
    };
}


export function postVideogame (payload){
    return async function(dispatch){
        const response = await axios.post("http://localhost:3001/videogames", payload)
        console.log(response)
        return response;
    }
}

export function filterGamesByGenre(payload){
    return {
        type: 'FILTER_BY_GENRE',
        payload
    }
}

export function filterCreated(payload){
    return {
        type: 'FILTER_CREATED',
        payload
    }
}

export function sortByName(payload){
    return {
        type: 'SORT_BY_NAME',
        payload
    }
}

export function sortByRating(payload){
    return {
        type: 'SORT_BY_RATING',
        payload
    }
}


export function getDetail(id){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/videogames/" + id);
            return dispatch ({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}