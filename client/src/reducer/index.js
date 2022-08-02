const initialState = {
    videogames : [],
    allGames: [],
    genres: [],
    detail: []
}

function rootReducer (state = initialState , action){
    switch(action.type){
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload,
                allGames: action.payload,
            }

        case 'GET_NAME_GAME':
            return{
                ...state,
                videogames: action.payload
            }

        case 'GET_GENRES':
            return{
                ...state,
                genres: action.payload
            }

        case 'POST_VIDEOGAME': 
            return{
                ...state,
            }

        case 'FILTER_BY_GENRE':
            const allGames = state.allGames
            const genresFlitered = allGames.filter((e) =>
            e.genres.includes(action.payload))
            return {
                ...state,
                videogames: action.payload === 'genres' ? allGames : genresFlitered

            }

        case 'FILTER_CREATED':
            const allGamesDb = state.allGames
            const createdFilter = action.payload === 'created' ? allGamesDb.filter(el => el.createdInDb) : allGamesDb.filter(el => !el.createdInDb)
            return {
                ...state, 
                videogames: action.payload === 'all' ? state.allGames : createdFilter
            }

        case 'SORT_BY_NAME':
            let orderedGames = action.payload  === 'A-Z' ? 
            state.videogames.sort(function (a , b) {
                if(a.name > b.name){
                    return 1;
                }
                if(b.name > a.name){
                    return -1
                }
                return 0;
            }) : 
            state.videogames.sort(function(a , b) {
                if(a.name > b.name){
                    return -1
                }
                if(b.name > a.name){
                    return 1
                }
                return 0
            })

            return {
                ...state,
                videogames: orderedGames
            }

        case 'SORT_BY_RATING':
            let orderRating = action.payload === 'ratingAsc' ? 
            state.videogames.sort((a , b)=>{
                if(a.rating > b.rating){
                    return 1
                }
                if(b.rating > a.rating){
                    return -1
                }
                return 0
            })
            : state.videogames.sort((a , b)=>{
                if(a.rating > b.rating){
                    return -1
                }
                if(b.rating > a.rating){
                    return 1
                }
                return 0
            })
            return{
                ...state,
                allGames : orderRating
            }
        
        case "GET_DETAILS":
            return{
                ...state,
                detail: action.payload
            }

        default: return state
    }
}

export default rootReducer