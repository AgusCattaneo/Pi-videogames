import axios from 'axios';

export function getVideogames(){
    return async function(dispatch){
        var json = await axios ("/videogames", {
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
            var json = await axios.get("/videogames?name=" + name)
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
        var info = await axios("/genres" , {

        });
        return dispatch ({type: "GET_GENRES" , payload: info.data});
    };
}


export function postVideogame (payload){
    return async function(dispatch){
        try{
        const response = await axios.post("/videogames", payload)
        console.log(response)
        return dispatch({
            type: "POST_VIDEOGAME",
            payload: response
        });
        } catch (err){
            console.log(err)
        }
    }
};

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
            var json = await axios.get("/videogames/" + id);
            return dispatch ({
                type: "GET_DETAILS",
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}