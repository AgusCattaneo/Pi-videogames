import React from 'react';
import {useState , useEffect} from 'react';
import {useDispatch , useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getVideogames , filterGamesByGenre , filterCreated , sortByName , sortByRating} from '../../actions';
import Card from '../Card/Card'
import Pagination from '../Pagination/Pagination';
import SearchBar from '../Search Bar/SearchBar';
import styles from './Home.module.css'




export default function Home (){

    const [order , setOrder] = useState("")

    const dispatch = useDispatch()
    const allVideogames = useSelector ((state) => state.videogames)
    const [currentPage , setCurrentPage] = useState(1)
    const [gamesPerPage , setGamesPerPage] = useState(15)
    const indexOfLastGame = currentPage * gamesPerPage
    const indexOfFirstGame = indexOfLastGame - gamesPerPage
    const currentGames = allVideogames.slice(indexOfFirstGame , indexOfLastGame)


    const pagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect (()=> {
        dispatch(getVideogames());
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getVideogames());
    }

    function handleFilterGenre(e){
        e.preventDefault();
        dispatch(filterGamesByGenre(e.target.value))
        setCurrentPage(1)
    }

    function handleFilterCreated(e){
        e.preventDefault();
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1)
    }

    const handleAlphabetical = (e) =>{
        e.preventDefault();
        dispatch(sortByName(e.target.value));
        setOrder(e.target.value)
        setCurrentPage(1)
    }

    const handleRating = (e) => {
        e.preventDefault();
        dispatch(sortByRating(e.target.value));
        setOrder(e.target.value)
        setCurrentPage(1)
    }


    return (
        <div>
        <div>
            <div className={styles.top}>       
                <Link to = '/videogame'>
                    <button className={styles.btnCreate}>Create Videogame</button>
                </Link>
                <SearchBar
                setCurrentPage={setCurrentPage}
                />
            </div>
            <div className={styles.container}>
                <button className={styles.btnReload} onClick={e=>{handleClick(e)}}>
                    Reload all videogames
                </button>
            </div>  
            <div className={styles.container}>
            <select className={styles.filters} onChange={(e)=>{handleRating(e)}}>
                <option value = 'ratingDefault'>Rating</option>
                <option value = 'ratingAsc'>Ascending</option>
                <option value ='ratingDesc'>Descending</option>
                </select>
            <select className={styles.filters} onChange={(e)=>{handleAlphabetical(e)}}>
                <option value = 'alphabeticalDefault'>Alphabetical</option>
                <option value = 'A-Z'>A-Z</option>
                <option value = 'Z-A'>Z-A</option>
            </select>
            <select className={styles.filters} onChange={(e)=>{handleFilterCreated(e)}}>
                <option value = 'all'>All Videogames</option>
                <option value = 'existing'>Existing Videogame</option>
                <option value = 'created'>Created Videogame</option>
            </select>
            <select className={styles.filters} onChange={(e)=>{handleFilterGenre(e)}}>
                <option value ='genres'>Genres</option>
                <option value="Action">Action</option>
                <option value="Indie">Indie</option>
                <option value="Adventure">Adventure</option>
                <option value="RPG">RPG</option>
                <option value="Strategy">Strategy</option>
                <option value="Shooter">Shooter</option>
                <option value="Casual">Casual</option>
                <option value="Simulation">Simulation</option>
                <option value="Puzzle">Puzzle</option>
                <option value="Arcade">Arcade</option>
                <option value="Platformer">Platformer</option>
                <option value="Racing">Racing</option>
                <option value="Massively Multiplayer">Massively Multiplayer</option>
                <option value="Sports">Sports</option>
                <option value="Fighting">Fighting</option>
                <option value="Family">Family</option>
                <option value="Board Games">Board Games</option>
                <option value="Educational">Educational</option>
                <option value="Card">Card</option>
            </select>
            </div>
            <div>
                <div className={styles.container}>
                    <Pagination
                        gamesPerPage={gamesPerPage}
                        allVideogames={allVideogames.length}
                        pagination = {pagination}
                    />
                </div>
                <div className={styles.gridcontainer}>
                    <div className={styles.grid}>
                        {currentGames?.map((v) => {
                            return (
                                <div key={v.id} >
                                    <Link className={styles.link}  to={"/home/" + v.id} >
                                        <Card name = {v.name} image = {v.image} genres = {v.genres} createdInDb = {v.createdInDb}key = {v.id}/>
                                    </Link>
                                </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}
